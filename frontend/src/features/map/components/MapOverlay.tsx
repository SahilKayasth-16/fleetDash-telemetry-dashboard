import React, { useMemo } from 'react';
import { X, User, Activity, Compass, MapPin } from 'lucide-react';
import { useTelemetry } from '../../../hooks/useTelemetry';
import styles from './MapOverlay.module.css';

interface MapOverlayProps {
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string | null) => void;
  zoom: number;
}

export const MapOverlay: React.FC<MapOverlayProps> = React.memo(({
  selectedVehicleId,
  onSelectVehicle,
  zoom,
}) => {
  const { state } = useTelemetry();
  const { vehicles } = state;

  const selectedVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId) || null;
  }, [vehicles, selectedVehicleId]);

  const activeCount = useMemo(() => {
    return vehicles.filter((v) => v.status === 'active').length;
  }, [vehicles]);

  return (
    <div className={styles.overlay}>
      {/* Top Left Global telemetry HUD */}
      <div className={styles.mapHudTopLeft}>
        <span className={styles.hudActiveTitle}>T-CORRIDOR // USA</span>
        <span>FLEET SENSORS: {vehicles.length}</span>
        <span>ACTIVE NODES: {activeCount}</span>
        <span>RESOLUTION: {zoom.toFixed(1)}X</span>
      </div>

      {/* Selected Vehicle Detail Card */}
      {selectedVehicle && (
        <div className={styles.selectedCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Transponder HUD: {selectedVehicle.id}</span>
            <button
              onClick={() => onSelectVehicle(null)}
              className={styles.closeButton}
              title="Close HUD Panel"
              aria-label="Close vehicle details"
            >
              <X size={14} />
            </button>
          </div>
          
          <div className={styles.cardBody}>
            {/* Driver Name */}
            <div className={styles.row}>
              <span className={styles.label}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><User size={10} /> Operator</span>
              </span>
              <span className={styles.val}>{selectedVehicle.driverName}</span>
            </div>

            {/* Velocity */}
            <div className={styles.row}>
              <span className={styles.label}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Activity size={10} /> Velocity</span>
              </span>
              <span className={styles.val}>{selectedVehicle.speed} MPH</span>
            </div>

            {/* Heading */}
            <div className={styles.row}>
              <span className={styles.label}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Compass size={10} /> Heading</span>
              </span>
              <span className={styles.val}>{selectedVehicle.heading}°</span>
            </div>

            {/* Coordinates */}
            <div className={styles.row}>
              <span className={styles.label}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={10} /> Location</span>
              </span>
              <span className={`${styles.val} ${styles.monoVal}`}>
                {selectedVehicle.latitude.toFixed(4)}°, {selectedVehicle.longitude.toFixed(4)}°
              </span>
            </div>

            {/* Status */}
            <div className={styles.row}>
              <span className={styles.label}>Status State</span>
              <span 
                className={styles.val} 
                style={{ 
                  color: 
                    selectedVehicle.status === 'active' ? 'var(--color-success)' :
                    selectedVehicle.status === 'warning' ? 'var(--color-warning)' :
                    selectedVehicle.status === 'stopped' ? 'var(--color-info)' : 'var(--text-muted)'
                }}
              >
                {selectedVehicle.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

MapOverlay.displayName = 'MapOverlay';

export default MapOverlay;
