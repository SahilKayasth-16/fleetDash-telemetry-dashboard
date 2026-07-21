import React, { createContext, useContext, useReducer, useEffect, useState, useRef, ReactNode } from 'react';
import { 
  TelemetryState, 
  FleetStats, 
  Vehicle, 
  TelemetryEvent, 
  SystemHealth, 
  ConnectionStatus,
  SocketConnectionState,
  VehicleTelemetry
} from '../types/telemetry';
import { initialTelemetryState } from '../data/placeholderData';
import { socketService } from '../services/socket.service';
import { Socket } from 'socket.io-client';

export type TelemetryAction =
  | { type: 'UPDATE_STATS'; payload: Partial<FleetStats> }
  | { type: 'UPDATE_SYSTEM_HEALTH'; payload: Partial<SystemHealth> }
  | { type: 'UPDATE_CONNECTION'; payload: Partial<ConnectionStatus> }
  | { type: 'UPDATE_VEHICLE'; payload: Vehicle }
  | { type: 'ADD_EVENT'; payload: TelemetryEvent }
  | { 
      type: 'BATCH_UPDATE_TELEMETRY'; 
      payload: { 
        vehicles: Vehicle[]; 
        newEventsCount: number; 
      } 
    };

const telemetryReducer = (state: TelemetryState, action: TelemetryAction): TelemetryState => {
  switch (action.type) {
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload },
      };
    case 'UPDATE_SYSTEM_HEALTH':
      return {
        ...state,
        systemHealth: { ...state.systemHealth, ...action.payload },
      };
    case 'UPDATE_CONNECTION':
      return {
        ...state,
        connection: { ...state.connection, ...action.payload },
      };
    case 'UPDATE_VEHICLE': {
      const exists = state.vehicles.some((v) => v.id === action.payload.id);
      const newVehicles = exists
        ? state.vehicles.map((v) => (v.id === action.payload.id ? action.payload : v))
        : [...state.vehicles, action.payload];
      return {
        ...state,
        vehicles: newVehicles,
      };
    }
    case 'ADD_EVENT':
      return {
        ...state,
        events: [action.payload, ...state.events].slice(0, 50),
      };
    case 'BATCH_UPDATE_TELEMETRY': {
      const { vehicles: updatedVehicles, newEventsCount } = action.payload;

      // 1. Map existing vehicles for fast update checks
      const vehicleMap = new Map(state.vehicles.map((v) => [v.id, v]));
      updatedVehicles.forEach((v) => {
        vehicleMap.set(v.id, v);
      });
      const nextVehicles = Array.from(vehicleMap.values());

      // 2. Re-calculate metrics
      const totalEvents = state.stats.totalTelemetryEvents + newEventsCount;
      const activeVehiclesCount = nextVehicles.filter(
        (v) => v.status !== 'offline' && v.status !== 'stopped'
      ).length;

      const onlineVehicles = nextVehicles.filter((v) => v.status !== 'offline');
      const averageSpeed = onlineVehicles.length > 0
        ? Number((onlineVehicles.reduce((sum, v) => sum + v.speed, 0) / onlineVehicles.length).toFixed(1))
        : state.stats.averageSpeed;

      return {
        ...state,
        vehicles: nextVehicles,
        stats: {
          ...state.stats,
          totalTelemetryEvents: totalEvents,
          activeVehicles: activeVehiclesCount,
          averageSpeed,
        },
      };
    }
    default:
      return state;
  }
};

export interface TelemetryContextType {
  state: TelemetryState;
  dispatch: React.Dispatch<TelemetryAction>;
  
  socket: Socket | null;
  connectionStatus: SocketConnectionState;
  latestTelemetry: VehicleTelemetry[];
  lastReceivedTimestamp: string | null;
  connectionError: string | null;
  
  connect: () => void;
  disconnect: () => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(telemetryReducer, initialTelemetryState);

  // Real-time socket status values
  const [connectionStatus, setConnectionStatus] = useState<SocketConnectionState>('disconnected');
  const [latestTelemetry, setLatestTelemetry] = useState<VehicleTelemetry[]>([]);
  const [lastReceivedTimestamp, setLastReceivedTimestamp] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Performance-critical refs to buffer high-frequency streams
  const vehiclesBufferRef = useRef<Map<string, Vehicle>>(new Map());
  const telemetryBufferRef = useRef<VehicleTelemetry[]>([]);
  const newEventsCounterRef = useRef<number>(0);
  const stateVehiclesRef = useRef<Vehicle[]>(state.vehicles);

  // Keep state reference updated to avoid stale effect closures
  stateVehiclesRef.current = state.vehicles;

  useEffect(() => {
    // 1. Subscribe to connection state changes
    const unsubscribeState = socketService.onConnectionStateChange((status, err) => {
      setConnectionStatus(status);
      setConnectionError(err || null);

      dispatch({
        type: 'UPDATE_CONNECTION',
        payload: {
          socketConnected: status === 'connected',
        },
      });

      dispatch({
        type: 'UPDATE_SYSTEM_HEALTH',
        payload: {
          socketServer: status === 'connected' ? 'online' : 'offline',
        },
      });
    });

    // 2. Subscribe to ping latency changes
    const unsubscribeLatency = socketService.onLatencyUpdate((latency) => {
      let quality: ConnectionStatus['networkQuality'] = 'excellent';
      if (latency >= 300) {
        quality = 'poor';
      } else if (latency >= 100) {
        quality = 'good';
      }

      dispatch({
        type: 'UPDATE_CONNECTION',
        payload: {
          networkLatency: latency,
          networkQuality: quality,
        },
      });
    });

    // 3. Subscribe to metadata and status changes
    const unsubscribeStatus = socketService.onServerStatus((statusData) => {
      dispatch({
        type: 'UPDATE_STATS',
        payload: {
          onlineConnections: statusData.connectedClients,
        },
      });

      dispatch({
        type: 'UPDATE_SYSTEM_HEALTH',
        payload: {
          apiGateway: statusData.status === 'OK' ? 'online' : 'offline',
        },
      });
    });

    // 4. Subscribe to decoded real-time vehicle updates
    const unsubscribeTelemetry = socketService.onTelemetryUpdate((telemetry) => {
      newEventsCounterRef.current += 1;
      telemetryBufferRef.current.push(telemetry);

      // Find original driver name to display (since binary lacks name metadata)
      const existingVehicle = stateVehiclesRef.current.find((v) => v.id === telemetry.vehicleId) || 
                              vehiclesBufferRef.current.get(telemetry.vehicleId);
      const driverName = existingVehicle ? existingVehicle.driverName : 'Unknown Driver';

      let status: Vehicle['status'] = 'active';
      if (telemetry.speed === 0) {
        status = 'stopped';
      } else if (telemetry.speed > 80) {
        status = 'warning';
      }

      const updatedVehicle: Vehicle = {
        id: telemetry.vehicleId,
        driverName,
        speed: telemetry.speed,
        heading: telemetry.heading,
        status,
        lastUpdated: 'Just now',
        latitude: telemetry.latitude,
        longitude: telemetry.longitude,
      };

      vehiclesBufferRef.current.set(telemetry.vehicleId, updatedVehicle);
    });

    // Open connection
    socketService.connect();

    return () => {
      unsubscribeState();
      unsubscribeLatency();
      unsubscribeStatus();
      unsubscribeTelemetry();
      socketService.disconnectWithDelay();
    };
  }, [dispatch]);

  // Periodic flush timer (100ms / 10Hz) to prevent high-frequency render thrashing
  useEffect(() => {
    const flushInterval = setInterval(() => {
      const hasVehicles = vehiclesBufferRef.current.size > 0;
      const telemetryBatch = [...telemetryBufferRef.current];

      if (hasVehicles || telemetryBatch.length > 0) {
        const bufferedVehicles = Array.from(vehiclesBufferRef.current.values());
        const count = newEventsCounterRef.current;

        // Clear buffering stores
        vehiclesBufferRef.current.clear();
        telemetryBufferRef.current = [];
        newEventsCounterRef.current = 0;

        // Apply state updates to vehicle list and statistics
        if (hasVehicles) {
          dispatch({
            type: 'BATCH_UPDATE_TELEMETRY',
            payload: {
              vehicles: bufferedVehicles,
              newEventsCount: count,
            },
          });
        }

        // Apply state updates to real-time streams log
        setLatestTelemetry((prev) => [...telemetryBatch, ...prev].slice(0, 100));
        if (telemetryBatch.length > 0) {
          setLastReceivedTimestamp(telemetryBatch[0].timestamp);
        }
      }
    }, 100);

    return () => {
      clearInterval(flushInterval);
    };
  }, [dispatch]);

  // Helper connection controls
  const connect = () => socketService.connect();
  const disconnect = () => socketService.disconnect();

  return (
    <TelemetryContext.Provider
      value={{
        state,
        dispatch,
        socket: socketService.getSocket(),
        connectionStatus,
        latestTelemetry,
        lastReceivedTimestamp,
        connectionError,
        connect,
        disconnect,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

// Deprecated: Moved out to hooks/useTelemetry.ts but kept for safety/backward compatibility
export const useTelemetry = (): TelemetryContextType => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};

export default TelemetryContext;
