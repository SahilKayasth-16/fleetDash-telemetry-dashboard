import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  severity?: 'success' | 'warning' | 'error' | 'info' | 'muted';
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  severity = 'info',
  pulse = false,
  children,
  className = '',
}) => {
  const badgeClasses = [
    styles.badge,
    styles[severity],
    className
  ].filter(Boolean).join(' ');

  const dotClasses = [
    styles.dot,
    pulse ? styles.pulse : ''
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses}>
      <span className={dotClasses} />
      {children}
    </span>
  );
};

export default Badge;
