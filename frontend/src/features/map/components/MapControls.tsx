import React from 'react';
import { ZoomIn, ZoomOut, RefreshCw, Crosshair, Maximize2, Minimize2 } from 'lucide-react';
import styles from './MapControls.module.css';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onCenterFleet: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const MapControls: React.FC<MapControlsProps> = React.memo(({
  onZoomIn,
  onZoomOut,
  onResetView,
  onCenterFleet,
  onToggleFullscreen,
  isFullscreen,
}) => {
  return (
    <div className={styles.controls}>
      {/* Zoom In */}
      <button 
        className={styles.button} 
        onClick={onZoomIn}
        aria-label="Zoom In Map"
        title="Zoom In"
      >
        <ZoomIn size={16} />
      </button>

      {/* Zoom Out */}
      <button 
        className={styles.button} 
        onClick={onZoomOut}
        aria-label="Zoom Out Map"
        title="Zoom Out"
      >
        <ZoomOut size={16} />
      </button>

      <div className={styles.divider} />

      {/* Center Fleet */}
      <button 
        className={styles.button} 
        onClick={onCenterFleet}
        aria-label="Center Fleet on Map"
        title="Center Fleet View"
      >
        <Crosshair size={16} />
      </button>

      {/* Reset View */}
      <button 
        className={styles.button} 
        onClick={onResetView}
        aria-label="Reset Map View coordinates"
        title="Reset Coordinate Frame"
      >
        <RefreshCw size={16} />
      </button>

      <div className={styles.divider} />

      {/* Fullscreen */}
      <button 
        className={styles.button} 
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? "Exit Fullscreen Map" : "Fullscreen Map"}
        title={isFullscreen ? "Exit Fullscreen" : "Maximize View"}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );
});

MapControls.displayName = 'MapControls';

export default MapControls;
