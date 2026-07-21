import React from 'react';
import { ShieldAlert, WifiOff, Zap, ShieldCheck } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import styles from './Alerts.module.css';

export const Alerts: React.FC = () => {
  const alerts = [
    { id: 'AL-9042', vehicleId: 'TX-1077', category: 'Geofencing', title: 'Geofence Exit Boundary Breach', desc: 'Vehicle exited authorized commercial sector zone: San Francisco West District', severity: 'CRITICAL', icon: ShieldAlert },
    { id: 'AL-9039', vehicleId: 'TX-1054', category: 'Sensor', title: 'High Engine Temperature Alert', desc: 'Sensor logged 104°C (Normal boundary max 100°C) during steep incline climb', severity: 'WARNING', icon: Zap },
    { id: 'AL-9031', vehicleId: 'TX-1077', category: 'Hardware', title: 'Sensor Disconnected Warning', desc: 'Battery level drops below 5% on backup GPS transmitter device', severity: 'WARNING', icon: WifiOff },
    { id: 'AL-9022', vehicleId: 'TX-1094', category: 'Geofencing', title: 'Geofence Entry Notification', desc: 'Vehicle entered refueling depot grid terminal safely', severity: 'INFO', icon: ShieldCheck },
  ];

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Alert Warnings Queue</h1>
          <p className={styles.subtitle}>Automatic real-time geofence breaches and sensor warning log triggers.</p>
        </div>
        <Button size="sm" variant="secondary">
          Clear All Logs
        </Button>
      </div>

      {/* Grid List */}
      <div className={styles.list}>
        {alerts.map((alert) => {
          const Icon = alert.icon;
          
          const cardClass = [
            styles.alertCard,
            alert.severity === 'CRITICAL' ? styles.criticalCard : 
            alert.severity === 'WARNING' ? styles.warningCard : styles.infoCard
          ].join(' ');

          const iconClass = [
            styles.iconWrapper,
            alert.severity === 'CRITICAL' ? styles.criticalIcon :
            alert.severity === 'WARNING' ? styles.warningIcon : styles.infoIcon
          ].join(' ');

          return (
            <div key={alert.id} className={cardClass}>
              <div className={iconClass}>
                <Icon size={20} />
              </div>
              <div className={styles.content}>
                <div className={styles.metaRow}>
                  <div className={styles.categoryGroup}>
                    <span>{alert.category}</span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ color: 'var(--color-neon-blue)' }}>{alert.vehicleId}</span>
                  </div>
                  <Badge 
                    severity={
                      alert.severity === 'CRITICAL' ? 'error' :
                      alert.severity === 'WARNING' ? 'warning' : 'success'
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <h3 className={styles.cardTitle}>{alert.title}</h3>
                <p className={styles.cardDesc}>{alert.desc}</p>
                <div className={styles.cardFooter}>
                  Log ID: {alert.id} • Trigger Time: Just now
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
