import React from 'react';
import Card from './Card';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: 'positive' | 'neutral' | 'negative';
  glow?: 'cyan' | 'purple' | 'blue';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = React.memo(({
  title,
  value,
  icon,
  trend,
  trendType = 'neutral',
  glow = 'blue',
  className = '',
}) => {
  const trendClass = 
    trendType === 'positive' ? styles.trendPositive :
    trendType === 'negative' ? styles.trendNegative : styles.trendNeutral;

  return (
    <Card glow={glow} className={`${styles.statCard} ${className}`} corners>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon}
      </div>
      <div className={styles.body}>
        <span className={styles.value}>{value}</span>
        {trend && (
          <span className={`${styles.trend} ${trendClass}`}>
            {trend}
          </span>
        )}
      </div>
    </Card>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;
