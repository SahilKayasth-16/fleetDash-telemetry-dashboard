import React from 'react';
import { Compass } from 'lucide-react';
import styles from './MapPlaceholder.module.css';

export const MapPlaceholder: React.FC = React.memo(() => {
  return (
    <div className={styles.viewport}>
      {/* Tactical grid */}
      <div className={styles.grid} />

      {/* Concentric radar range lines */}
      <div className={`${styles.radarRings} ${styles.ring1}`} />
      <div className={`${styles.radarRings} ${styles.ring2}`} />
      <div className={`${styles.radarRings} ${styles.ring3}`} />

      {/* Radar sweeping Conic-gradient */}
      <div className={styles.radarSweep} />

      {/* Floating compass HUD */}
      <div className={styles.compass} title="Map Orientation">
        <Compass size={18} className="anim-spin-slow" />
      </div>

      {/* Grid Coordinates sectors */}
      <span className={`${styles.sectorTag} ${styles.sectorNW}`}>SEC: NW // LAT: 45.0000° N</span>
      <span className={`${styles.sectorTag} ${styles.sectorNE}`}>SEC: NE // LAT: 45.0000° N</span>
      <span className={`${styles.sectorTag} ${styles.sectorSW}`}>SEC: SW // LNG: -125.0000° W</span>
      <span className={`${styles.sectorTag} ${styles.sectorSE}`}>SEC: SE // LNG: -65.0000° W</span>
    </div>
  );
});

MapPlaceholder.displayName = 'MapPlaceholder';

export default MapPlaceholder;
