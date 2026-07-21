import React from 'react';
import styles from './MapContainer.module.css';

interface MapContainerProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  title,
  subtitle,
  actions,
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export default MapContainer;
