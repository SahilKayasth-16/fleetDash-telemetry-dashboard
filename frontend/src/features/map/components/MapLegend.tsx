import React from 'react';
import styles from './MapLegend.module.css';

export const MapLegend: React.FC = React.memo(() => {
  return (
    <div className={styles.legend}>
      {/* Active */}
      <div className={styles.item}>
        <span className={`${styles.dot} ${styles.dot_active}`} />
        <span>Moving</span>
      </div>

      {/* Warning */}
      <div className={styles.item}>
        <span className={`${styles.dot} ${styles.dot_warning}`} />
        <span>Warning</span>
      </div>

      {/* Stopped */}
      <div className={styles.item}>
        <span className={`${styles.dot} ${styles.dot_stopped}`} />
        <span>Idle</span>
      </div>

      {/* Offline */}
      <div className={styles.item}>
        <span className={`${styles.dot} ${styles.dot_offline}`} />
        <span>Offline</span>
      </div>
    </div>
  );
});

MapLegend.displayName = 'MapLegend';

export default MapLegend;
