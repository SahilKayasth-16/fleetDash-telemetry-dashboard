import React, { useMemo } from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import styles from './VehicleLayer.module.css';

interface VehicleLayerProps {
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string | null) => void;
}

export const VehicleLayer: React.FC<VehicleLayerProps> = React.memo(({
  selectedVehicleId,
  onSelectVehicle,
}) => {
  const { state } = useTelemetry();
  const { vehicles } = state;

  // Compute bounding box auto-scaling values for the current fleet
  const projectionData = useMemo(() => {
    if (vehicles.length === 0) return { minLat: 0, deltaLat: 1, minLng: 0, deltaLng: 1 };
    
    const lats = vehicles.map((v) => v.latitude);
    const lngs = vehicles.map((v) => v.longitude);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const deltaLat = maxLat - minLat || 1;
    const deltaLng = maxLng - minLng || 1;
    
    return { minLat, deltaLat, minLng, deltaLng };
  }, [vehicles]);

  const projectedVehicles = useMemo(() => {
    const { minLat, deltaLat, minLng, deltaLng } = projectionData;
    
    return vehicles.map((vehicle) => {
      // Map latitude: higher lat is higher up on screen (y goes from 90% to 10%)
      const y = 85 - ((vehicle.latitude - minLat) / deltaLat) * 70;
      // Map longitude: higher lng is further right on screen (x goes from 15% to 85%)
      const x = 15 + ((vehicle.longitude - minLng) / deltaLng) * 70;
      
      return {
        ...vehicle,
        x: `${x}%`,
        y: `${y}%`,
      };
    });
  }, [vehicles, projectionData]);

  const handleMarkerClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onSelectVehicle(selectedVehicleId === id ? null : id);
  };

  return (
    <div className={styles.layer} onClick={() => onSelectVehicle(null)}>
      {projectedVehicles.map((vehicle) => {
        const isSelected = selectedVehicleId === vehicle.id;
        const dotStyle = styles[`dot_${vehicle.status}`] || styles.dot_offline;

        return (
          <div
            key={vehicle.id}
            className={styles.marker}
            style={{ left: vehicle.x, top: vehicle.y }}
            onClick={(e) => handleMarkerClick(e, vehicle.id)}
            role="button"
            tabIndex={0}
            aria-label={`Vehicle Transponder: ${vehicle.id}, Speed: ${vehicle.speed} MPH, Driver: ${vehicle.driverName}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectVehicle(selectedVehicleId === vehicle.id ? null : vehicle.id);
              }
            }}
          >
            {/* Selection indicator ring */}
            {isSelected && <div className={styles.selectionRing} />}

            {/* Direction pointer indicator */}
            {vehicle.status !== 'offline' && vehicle.heading !== undefined && (
              <div 
                className={styles.headingPointer} 
                style={{ transform: `rotate(${vehicle.heading}deg)` }}
              />
            )}

            {/* Position coordinate marker dot */}
            <div className={`${styles.dot} ${dotStyle}`} />

            {/* Overlay label tooltip */}
            <span className={`${styles.tooltip} ${isSelected ? styles.selectedTooltip : ''}`}>
              {vehicle.id} ({vehicle.speed} MPH)
            </span>
          </div>
        );
      })}
    </div>
  );
});

VehicleLayer.displayName = 'VehicleLayer';

export default VehicleLayer;
