export interface FleetStats {
  activeVehicles: number;
  totalTelemetryEvents: number;
  averageSpeed: number;
  onlineConnections: number;
  activeVehiclesTrend: string;
  eventsTrend: string;
  speedTrend: string;
  connectionsTrend: string;
}

export type VehicleStatus = 'active' | 'warning' | 'stopped' | 'offline';

export interface Vehicle {
  id: string;
  driverName: string;
  speed: number;
  heading: number;
  status: VehicleStatus;
  lastUpdated: string;
  lastUpdatedTime: number;
  latitude: number;
  longitude: number;
}

export type EventSeverity = 'info' | 'warning' | 'critical' | 'success';
export type EventType = 'geofence_entry' | 'geofence_exit' | 'overspeed' | 'sensor_reading' | 'hardware_fault' | 'telemetry_received';

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  vehicleId: string;
  eventType: EventType;
  description: string;
  severity: EventSeverity;
}

export interface SystemHealth {
  mongodb: 'connected' | 'disconnected' | 'connecting';
  redis: 'connected' | 'disconnected' | 'connecting';
  workerPool: 'nominal' | 'degraded' | 'error';
  apiGateway: 'online' | 'offline';
  socketServer: 'online' | 'offline';
}

export interface ConnectionStatus {
  socketConnected: boolean;
  lastUpdate: string;
  networkLatency: number;
  networkQuality: 'excellent' | 'good' | 'poor' | 'offline';
}

export interface TelemetryState {
  stats: FleetStats;
  vehicles: Vehicle[];
  events: TelemetryEvent[];
  systemHealth: SystemHealth;
  connection: ConnectionStatus;
}

export type SocketConnectionState = 'connected' | 'connecting' | 'reconnecting' | 'disconnected' | 'error';

export interface VehicleTelemetry {
  vehicleId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
}

export type TelemetryData = VehicleTelemetry;

