import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  glow?: 'cyan' | 'purple' | 'blue' | 'none';
  corners?: boolean;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  glow = 'none',
  corners = false,
  actions,
  footer,
  children,
  className = '',
  style,
}) => {
  const glowClass = 
    glow === 'cyan' ? styles.glowCyan :
    glow === 'purple' ? styles.glowPurple :
    glow === 'blue' ? styles.glowBlue : '';

  const cardClasses = `${styles.card} ${glowClass} ${className}`.trim();

  return (
    <div className={cardClasses} style={style}>
      {corners && <div className={styles.corners} />}
      
      {(title || subtitle || actions) && (
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}

      <div className={styles.body}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
