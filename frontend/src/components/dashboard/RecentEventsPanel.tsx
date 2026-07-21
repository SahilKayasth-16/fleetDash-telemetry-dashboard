import React from 'react';
import { Clock } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { TelemetryEvent } from '../../types/telemetry';
import Panel from '../ui/Panel';
import Badge from '../ui/Badge';
import styles from './RecentEventsPanel.module.css';

interface EventItemProps {
  event: TelemetryEvent;
}

// Optimized individual event row
const EventItem: React.FC<EventItemProps> = React.memo(({ event }) => {
  const getSeverity = (severity: TelemetryEvent['severity']) => {
    switch (severity) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      case 'info': return 'info';
      default: return 'info';
    }
  };

  const getEventLabel = (type: TelemetryEvent['eventType']) => {
    return type.replace('_', ' ').toUpperCase();
  };

  return (
    <div className={styles.eventRow}>
      <div className={styles.eventContent}>
        <div className={styles.metaRow}>
          <span>{getEventLabel(event.eventType)}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.08)' }}>•</span>
          <span className={styles.vehicleId}>{event.vehicleId}</span>
        </div>
        
        <p className={styles.description}>{event.description}</p>
        
        <div className={styles.timestampRow}>
          <Clock size={10} />
          <span>{event.timestamp}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.08)' }}>•</span>
          <span>ID: {event.id}</span>
        </div>
      </div>

      <div className={styles.statusWrapper}>
        <Badge severity={getSeverity(event.severity)}>
          {event.severity.toUpperCase()}
        </Badge>
      </div>
    </div>
  );
});

EventItem.displayName = 'EventItem';

export const RecentEventsPanel: React.FC = React.memo(() => {
  const { state } = useTelemetry();
  const { events } = state;

  return (
    <Panel title="Ingestion Queue Logs" metaText="Active Stream" glowTitle>
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </Panel>
  );
});

RecentEventsPanel.displayName = 'RecentEventsPanel';

export default RecentEventsPanel;
