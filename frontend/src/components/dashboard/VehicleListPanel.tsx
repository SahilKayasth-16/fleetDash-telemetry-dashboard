import React from 'react';
import { Compass, Clock } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Vehicle } from '../../types/telemetry';
import Panel from '../ui/Panel';
import Badge from '../ui/Badge';
import styles from './VehicleListPanel.module.css';

interface VehicleCardProps {
  vehicle: Vehicle;
}

// Optimized individual vehicle row card
const VehicleCard: React.FC<VehicleCardProps> = React.memo(({ vehicle }) => {
  const getSeverity = (status: Vehicle['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'stopped': return 'info';
      case 'offline': return 'muted';
      default: return 'info';
    }
  };

  return (
    <div className={styles.vehicleCard}>
      <div className={styles.vehicleInfo}>
        <div className={styles.idHeader}>
          <span className={styles.vehicleId}>{vehicle.id}</span>
        </div>
        <span className={styles.driverName}>{vehicle.driverName}</span>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Velocity</span>
            <span className={styles.statVal}>{vehicle.speed} MPH</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Heading</span>
            <span className={styles.statVal} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Compass size={10} /> {vehicle.heading}°
            </span>
          </div>
        </div>
      </div>

      <div className={styles.statusWrapper}>
        <Badge severity={getSeverity(vehicle.status)}>
          {vehicle.status.toUpperCase()}
        </Badge>
        <span className={styles.timeLabel}>
          <Clock size={10} /> {vehicle.lastUpdated}
        </span>
      </div>
    </div>
  );
});

VehicleCard.displayName = 'VehicleCard';

export const VehicleListPanel: React.FC = React.memo(() => {
  const { state } = useTelemetry();
  const { vehicles } = state;

  return (
    <Panel title="Active Fleet Transponders" metaText={`Online: ${vehicles.filter(v => v.status !== 'offline').length}/${vehicles.length}`} glowTitle>
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </Panel>
  );
});

VehicleListPanel.displayName = 'VehicleListPanel';

export default VehicleListPanel;
