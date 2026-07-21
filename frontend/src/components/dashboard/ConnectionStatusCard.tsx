import React from 'react';
import { Clock, Activity, Signal } from 'lucide-react';
import { useTelemetry } from '../../hooks/useTelemetry';
import Panel from '../ui/Panel';
import MetricItem from '../ui/MetricItem';
import styles from './ConnectionStatusCard.module.css';

export const ConnectionStatusCard: React.FC = React.memo(() => {
  const { state, connectionStatus, lastReceivedTimestamp, connectionError } = useTelemetry();
  const { connection, stats } = state;

  const pulseClass = 
    connectionStatus === 'connected'
      ? (connection.networkQuality === 'excellent' ? styles.pulseExcellent : connection.networkQuality === 'good' ? styles.pulseGood : styles.pulsePoor)
      : (connectionStatus === 'connecting' || connectionStatus === 'reconnecting' ? styles.pulseGood : styles.pulseOffline);

  const statusLabel = connectionStatus === 'connected' 
    ? `CONNECTED (${connection.networkQuality.toUpperCase()})` 
    : connectionStatus.toUpperCase();

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
            value={connectionStatus === 'connected' ? connection.networkQuality.toUpperCase() : 'OFFLINE'}
            statusColor={
              connectionStatus === 'connected'
                ? (connection.networkQuality === 'excellent' || connection.networkQuality === 'good' ? 'success' : 'warning')
                : 'muted'
            }
          />

          {/* Network Latency */}
          <MetricItem
            label={
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={12} /> Connection Latency
              </span>
            }
            value={connectionStatus === 'connected' ? `${connection.networkLatency} ms` : 'N/A'}
            progress={connectionStatus === 'connected' ? (connection.networkLatency === 0 ? 0 : Math.max(5, 100 - (connection.networkLatency / 2))) : 0}
            progressColor={connection.networkLatency < 10 ? 'success' : connection.networkLatency < 50 ? 'blue' : 'warning'}
          />

          {/* Last Update */}
          <MetricItem
            label={
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={12} /> Last Message Time
              </span>
            }
            value={lastReceivedTimestamp ? new Date(lastReceivedTimestamp).toLocaleTimeString() : 'No messages'}
            statusColor={connectionStatus === 'connected' ? 'info' : 'muted'}
          />

          {/* Messages count */}
          <MetricItem
            label="Messages Received"
            value={stats.totalTelemetryEvents.toLocaleString()}
            statusColor="info"
          />

          {/* Diagnostics info */}
          {connectionError && (
            <MetricItem
              label="Diagnostics Info"
              value={connectionError}
              statusColor="warning"
            />
          )}
        </div>
      </div>
    </Panel>
  );
});

ConnectionStatusCard.displayName = 'ConnectionStatusCard';

export default ConnectionStatusCard;
