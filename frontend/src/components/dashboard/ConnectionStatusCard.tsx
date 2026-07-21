import React from 'react';
import { Clock, Activity, Signal } from 'lucide-react';
import { useTelemetry } from '../../hooks/useTelemetry';
import Panel from '../ui/Panel';
import MetricItem from '../ui/MetricItem';
import styles from './ConnectionStatusCard.module.css';

export const ConnectionStatusCard: React.FC = React.memo(() => {
  const { state } = useTelemetry();
  const { connection } = state;

  const pulseClass = 
    !connection.socketConnected ? styles.pulseOffline :
    connection.networkQuality === 'excellent' ? styles.pulseExcellent :
    connection.networkQuality === 'good' ? styles.pulseGood : styles.pulsePoor;

  const statusLabel = connection.socketConnected 
    ? `CONNECTED (${connection.networkQuality.toUpperCase()})` 
    : 'DISCONNECTED';

  return (
    <Panel title="Network Diagnostics" metaText="Live Event Socket" glowTitle>
      <div className={styles.container}>
        <div className={styles.indicatorRow}>
          <div className={styles.connectionState}>
            <span className={`${styles.pulseDot} ${pulseClass}`} />
            <span>{statusLabel}</span>
          </div>
          <span className={styles.statusLabel}>WebSocket Pipeline</span>
        </div>

        <div className={styles.metrics}>
          {/* Signal Quality */}
          <MetricItem
            label={
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Signal size={12} /> Network Quality
              </span>
            }
            value={connection.networkQuality.toUpperCase()}
            statusColor={
              connection.networkQuality === 'excellent' || connection.networkQuality === 'good' 
                ? 'success' 
                : connection.networkQuality === 'poor' 
                ? 'warning' 
                : 'error'
            }
          />

          {/* Network Latency */}
          <MetricItem
            label={
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={12} /> Connection Latency
              </span>
            }
            value={`${connection.networkLatency} ms`}
            progress={connection.networkLatency === 0 ? 0 : Math.max(5, 100 - (connection.networkLatency / 2))}
            progressColor={connection.networkLatency < 10 ? 'success' : connection.networkLatency < 50 ? 'blue' : 'warning'}
          />

          {/* Last Update */}
          <MetricItem
            label={
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={12} /> Last Handshake
              </span>
            }
            value={connection.lastUpdate}
            statusColor={connection.socketConnected ? 'info' : 'muted'}
          />
        </div>
      </div>
    </Panel>
  );
});

ConnectionStatusCard.displayName = 'ConnectionStatusCard';

export default ConnectionStatusCard;
