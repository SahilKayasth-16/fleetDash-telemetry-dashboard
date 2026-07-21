import React, { useState, useEffect, useMemo } from 'react';
import { Compass, Clock } from 'lucide-react';
import { useTelemetry } from '../../hooks/useTelemetry';
import { Vehicle } from '../../types/telemetry';
import Panel from '../ui/Panel';
import Badge from '../ui/Badge';
import styles from './VehicleListPanel.module.css';

interface VehicleCardProps {
  vehicle: Vehicle;
}

/**
 * Formats epoch milliseconds to a user-friendly relative timestamp
 */
function formatRelativeTime(epochMs: number): string {
  if (!epochMs) return 'Never';
  const diffSec = Math.floor((Date.now() - epochMs) / 1000);
  if (diffSec < 2) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  return `${diffMin}m ago`;
}

// Optimized individual vehicle row card
const VehicleCard: React.FC<VehicleCardProps> = React.memo(({ vehicle }) => {
  const [relativeTime, setRelativeTime] = useState(() => formatRelativeTime(vehicle.lastUpdatedTime));

  useEffect(() => {
    // Instantly sync when a new update arrives
    setRelativeTime(formatRelativeTime(vehicle.lastUpdatedTime));

    const interval = setInterval(() => {
      setRelativeTime(formatRelativeTime(vehicle.lastUpdatedTime));
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [vehicle.lastUpdatedTime]);

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
          {/* Velocity */}
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Velocity</span>
            <span className={styles.statVal}>{vehicle.speed} MPH</span>
          </div>

          {/* Heading */}
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Heading</span>
            <span className={styles.statVal} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Compass size={10} /> {vehicle.heading}°
            </span>
          </div>

          {/* Location Coordinates */}
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Coordinates</span>
            <span className={styles.statVal} style={{ fontSize: '0.68rem', opacity: 0.85 }}>
              {vehicle.latitude.toFixed(4)}, {vehicle.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.statusWrapper}>
        <Badge severity={getSeverity(vehicle.status)}>
          {vehicle.status.toUpperCase()}
        </Badge>
        <span className={styles.timeLabel}>
          <Clock size={10} /> {relativeTime}
        </span>
      </div>
    </div>
  );
});

VehicleCard.displayName = 'VehicleCard';

export const VehicleListPanel: React.FC = React.memo(() => {
  const { state } = useTelemetry();
  const { vehicles } = state;

  // Limit rendering in the DOM to the top 25 transponders
  const visibleVehicles = useMemo(() => {
    return vehicles.slice(0, 25);
  }, [vehicles]);

  const onlineCount = useMemo(() => {
    return vehicles.filter((v) => v.status !== 'offline').length;
  }, [vehicles]);

  return (
    <Panel 
      title="Active Fleet Transponders" 
      metaText={`Online: ${onlineCount}/${vehicles.length}`} 
      glowTitle
    >
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {visibleVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </Panel>
  );
});

VehicleListPanel.displayName = 'VehicleListPanel';

export default VehicleListPanel;
