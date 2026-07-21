import React from 'react';
import styles from './MetricItem.module.css';

interface MetricItemProps {
  label: React.ReactNode;
  value: string | number;
  statusColor?: 'success' | 'warning' | 'error' | 'info' | 'muted';
  progress?: number;
  progressColor?: 'cyan' | 'blue' | 'purple' | 'success' | 'warning' | 'error';
  className?: string;
}

export const MetricItem: React.FC<MetricItemProps> = React.memo(({
  label,
  value,
  statusColor,
  progress,
  progressColor = 'cyan',
  className = '',
}) => {
  const dotClass = statusColor ? styles[`dot_${statusColor}`] : '';
  const fillClass = progressColor ? styles[`fill_${progressColor}`] : '';

  return (
    <div className={`${styles.item} ${className}`}>
      <div className={styles.labelRow}>
        <div className={styles.labelWrapper}>
          {statusColor && <span className={`${styles.statusDot} ${dotClass}`} />}
          <span>{label}</span>
        </div>
        <span className={styles.value}>{value}</span>
      </div>

      {progress !== undefined && (
        <div className={styles.barTrack}>
          <div 
            className={`${styles.barFill} ${fillClass}`} 
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
});

MetricItem.displayName = 'MetricItem';

export default MetricItem;
