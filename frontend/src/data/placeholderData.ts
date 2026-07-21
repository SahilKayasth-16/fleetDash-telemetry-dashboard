import { TelemetryState } from '../types/telemetry';

const now = Date.now();

export const initialTelemetryState: TelemetryState = {
  stats: {
    activeVehicles: 1248,
    totalTelemetryEvents: 854209,
    averageSpeed: 62.4,
    onlineConnections: 4,
    activeVehiclesTrend: '+12% from last hour',
    eventsTrend: '+1.2k events/sec',
    speedTrend: 'Optimal fuel range',
    connectionsTrend: '99.98% gateway uptime',
  },
  systemHealth: {
    mongodb: 'connected',
    redis: 'connected',
    workerPool: 'nominal',
    apiGateway: 'online',
    socketServer: 'online',
  },
  connection: {
    socketConnected: true,
    lastUpdate: 'Just now',
    networkLatency: 4,
    networkQuality: 'excellent',
  },
  vehicles: [
    { id: 'TX-1094', driverName: 'Sarah Connor', speed: 62, heading: 180, status: 'active', lastUpdated: '1s ago', lastUpdatedTime: now - 1000, latitude: 37.7749, longitude: -122.4194 },
    { id: 'TX-1092', driverName: 'Marcus Wright', speed: 45, heading: 90, status: 'active', lastUpdated: '4s ago', lastUpdatedTime: now - 4000, latitude: 34.0522, longitude: -118.2437 },
    { id: 'TX-1077', driverName: 'John Connor', speed: 0, heading: 270, status: 'stopped', lastUpdated: '12s ago', lastUpdatedTime: now - 12000, latitude: 40.7128, longitude: -74.0060 },
    { id: 'TX-1091', driverName: 'Kyle Reese', speed: 58, heading: 45, status: 'active', lastUpdated: '1m ago', lastUpdatedTime: now - 60000, latitude: 41.8781, longitude: -87.6298 },
    { id: 'TX-1054', driverName: 'Ellen Ripley', speed: 81, heading: 135, status: 'warning', lastUpdated: '3s ago', lastUpdatedTime: now - 3000, latitude: 29.7604, longitude: -95.3698 },
    { id: 'TX-1088', driverName: 'Peter Parker', speed: 55, heading: 320, status: 'active', lastUpdated: '8s ago', lastUpdatedTime: now - 8000, latitude: 39.7392, longitude: -104.9903 },
    { id: 'TX-1023', driverName: 'Bruce Wayne', speed: 0, heading: 0, status: 'offline', lastUpdated: '5m ago', lastUpdatedTime: now - 300000, latitude: 42.3601, longitude: -71.0589 },
    { id: 'TX-1045', driverName: 'Clark Kent', speed: 65, heading: 215, status: 'active', lastUpdated: '2s ago', lastUpdatedTime: now - 2000, latitude: 32.7767, longitude: -96.7970 },
    { id: 'TX-1033', driverName: 'Diana Prince', speed: 72, heading: 60, status: 'active', lastUpdated: '5s ago', lastUpdatedTime: now - 5000, latitude: 25.7617, longitude: -80.1918 },
    { id: 'TX-1011', driverName: 'Arthur Dent', speed: 0, heading: 120, status: 'stopped', lastUpdated: '30s ago', lastUpdatedTime: now - 30000, latitude: 37.7850, longitude: -122.4050 },
    { id: 'TX-1002', driverName: 'Ford Prefect', speed: 65, heading: 10, status: 'active', lastUpdated: '15s ago', lastUpdatedTime: now - 15000, latitude: 37.7640, longitude: -122.4320 },
    { id: 'TX-1018', driverName: 'Tricia McMillan', speed: 50, heading: 80, status: 'active', lastUpdated: '20s ago', lastUpdatedTime: now - 20000, latitude: 37.7550, longitude: -122.4200 },
    { id: 'TX-1031', driverName: 'Zaphod Beeblebrox', speed: 85, heading: 190, status: 'warning', lastUpdated: '10s ago', lastUpdatedTime: now - 10000, latitude: 37.7920, longitude: -122.4100 },
    { id: 'TX-1042', driverName: 'Marvin Android', speed: 0, heading: 0, status: 'stopped', lastUpdated: '1m ago', lastUpdatedTime: now - 60000, latitude: 37.7680, longitude: -122.4150 },
    { id: 'TX-1065', driverName: 'Slartibartfast', speed: 40, heading: 290, status: 'active', lastUpdated: '45s ago', lastUpdatedTime: now - 45000, latitude: 37.7710, longitude: -122.4400 },
    { id: 'TX-1070', driverName: 'Trillian Astra', speed: 0, heading: 350, status: 'offline', lastUpdated: '8m ago', lastUpdatedTime: now - 480000, latitude: 37.7600, longitude: -122.3900 }
  ],
  events: [
    { id: 'EV-8041', timestamp: '12:43:58', vehicleId: 'TX-1094', eventType: 'sensor_reading', description: 'Engine oil pressure reading nominal at 45 PSI', severity: 'success' },
    { id: 'EV-8040', timestamp: '12:43:50', vehicleId: 'TX-1054', eventType: 'overspeed', description: 'Vehicle exceeded highway velocity threshold: logged 81 MPH', severity: 'warning' },
    { id: 'EV-8039', timestamp: '12:43:42', vehicleId: 'TX-1077', eventType: 'hardware_fault', description: 'Backup GPS transponder drops below critical battery level (4%)', severity: 'critical' },
    { id: 'EV-8038', timestamp: '12:43:30', vehicleId: 'TX-1092', eventType: 'geofence_exit', description: 'Breach detected: Left authorized commercial sector boundary', severity: 'warning' },
    { id: 'EV-8037', timestamp: '12:43:15', vehicleId: 'TX-1091', eventType: 'geofence_entry', description: 'Vehicle checked into refueling grid terminal zone safely', severity: 'success' },
    { id: 'EV-8036', timestamp: '12:42:55', vehicleId: 'TX-1088', eventType: 'sensor_reading', description: 'Coolant fluid system logs temperature stable at 90°C', severity: 'info' },
    { id: 'EV-8035', timestamp: '12:42:10', vehicleId: 'TX-1023', eventType: 'hardware_fault', description: 'Transponder system connection timeout; heartbeat ping failed', severity: 'critical' },
    { id: 'EV-8034', timestamp: '12:41:40', vehicleId: 'TX-1045', eventType: 'sensor_reading', description: 'Battery charge state reads 100% capacity', severity: 'info' },
    { id: 'EV-8033', timestamp: '12:41:02', vehicleId: 'TX-1033', eventType: 'sensor_reading', description: 'Transmitting spatial coordinates handshake OK', severity: 'success' },
    { id: 'EV-8032', timestamp: '12:39:55', vehicleId: 'TX-1094', eventType: 'geofence_entry', description: 'Re-entered authorized commercial sector corridor', severity: 'info' }
  ]
};
