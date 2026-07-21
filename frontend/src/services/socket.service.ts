import { io, Socket } from 'socket.io-client';
import { SocketConnectionState, VehicleTelemetry } from '../types/telemetry';
import { deserializeTelemetry } from '../utils/binaryDeserializer';

class SocketService {
  private socket: Socket | null = null;
  private connectionState: SocketConnectionState = 'disconnected';
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private disconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  
  // Callbacks lists
  private stateCallbacks: Set<(state: SocketConnectionState, error?: string) => void> = new Set();
  private telemetryCallbacks: Set<(data: VehicleTelemetry) => void> = new Set();
  private statusCallbacks: Set<(data: { status: string; connectedClients: number; timestamp: string }) => void> = new Set();
  private latencyCallbacks: Set<(latency: number) => void> = new Set();

  constructor() {
    // Socket url binds to current window origin (uses proxy configured in vite.config.ts)
    this.socket = io(window.location.origin, {
      autoConnect: false,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.setupListeners();
  }

  /**
   * Register Socket.io built-in & custom event listeners
   */
  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.updateState('connected');
      this.startHeartbeat();
    });

    this.socket.on('disconnect', (reason) => {
      this.stopHeartbeat();
      this.updateState('disconnected', `Disconnected: ${reason}`);
    });

    this.socket.on('connect_error', (error) => {
      this.stopHeartbeat();
      this.updateState('error', `Connection error: ${error.message}`);
    });

    this.socket.on('reconnect_attempt', (attempt) => {
      this.updateState('reconnecting', `Reconnecting attempt ${attempt}`);
    });

    this.socket.on('reconnect_error', (error) => {
      this.updateState('error', `Reconnection error: ${error.message}`);
    });

    this.socket.on('reconnect', () => {
      this.updateState('connected');
      this.startHeartbeat();
    });

    // Custom telemetry stream payload events (binary serialized Buffer)
    this.socket.on('telemetry:update', (binaryData: unknown) => {
      try {
        const decoded = deserializeTelemetry(binaryData);
        this.telemetryCallbacks.forEach((cb) => cb(decoded));
      } catch (err) {
        console.error('[SocketService] Failed to deserialize binary telemetry:', err);
      }
    });

    // Gateway server status updates
    this.socket.on('server:status', (data: { status: string; connectedClients: number; timestamp: string }) => {
      this.statusCallbacks.forEach((cb) => cb(data));
    });

    // Heartbeat ack response from backend server to calculate latency
    this.socket.on('heartbeat:ack', (data: { receivedAt: string; clientTime: string }) => {
      if (data && data.clientTime) {
        const latency = Date.now() - new Date(data.clientTime).getTime();
        this.latencyCallbacks.forEach((cb) => cb(latency));
      }
    });
  }

  private updateState(state: SocketConnectionState, error?: string) {
    this.connectionState = state;
    this.stateCallbacks.forEach((cb) => cb(state, error));
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.sendPing();
    
    this.heartbeatInterval = setInterval(() => {
      this.sendPing();
    }, 5000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private sendPing() {
    if (this.socket && this.socket.connected) {
      this.socket.emit('heartbeat', { time: new Date().toISOString() });
    }
  }

  // Public Interface Methods
  public connect() {
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
      this.disconnectTimeout = null;
    }
    if (this.socket && !this.socket.connected) {
      this.updateState('connecting');
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
      this.disconnectTimeout = null;
    }
    this.stopHeartbeat();
    if (this.socket) {
      this.socket.disconnect();
    }
    this.updateState('disconnected');
  }

  public disconnectWithDelay(delayMs = 150) {
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
    }
    this.disconnectTimeout = setTimeout(() => {
      this.disconnect();
      this.disconnectTimeout = null;
    }, delayMs);
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public getConnectionState(): SocketConnectionState {
    return this.connectionState;
  }

  // Listeners subscriptions with teardown hooks
  public onConnectionStateChange(cb: (state: SocketConnectionState, error?: string) => void): () => void {
    this.stateCallbacks.add(cb);
    cb(this.connectionState); // Notify current state on initial subscribe
    return () => {
      this.stateCallbacks.delete(cb);
    };
  }

  public onTelemetryUpdate(cb: (data: VehicleTelemetry) => void): () => void {
    this.telemetryCallbacks.add(cb);
    return () => {
      this.telemetryCallbacks.delete(cb);
    };
  }

  public onServerStatus(cb: (data: { status: string; connectedClients: number; timestamp: string }) => void): () => void {
    this.statusCallbacks.add(cb);
    return () => {
      this.statusCallbacks.delete(cb);
    };
  }

  public onLatencyUpdate(cb: (latency: number) => void): () => void {
    this.latencyCallbacks.add(cb);
    return () => {
      this.latencyCallbacks.delete(cb);
    };
  }
}

export const socketService = new SocketService();
export default socketService;
