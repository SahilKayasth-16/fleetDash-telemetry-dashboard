import React from 'react';
import { Database, Server, Cpu, Globe, Link2 } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import Panel from '../ui/Panel';
import Badge from '../ui/Badge';
import styles from './SystemHealthCard.module.css';

export const SystemHealthCard: React.FC = React.memo(() => {
  const { state } = useTelemetry();
  const { systemHealth } = state;

  return (
    <Panel title="System Node Health" metaText="Gateway Pipeline Status" glowTitle>
      <div className={styles.list}>
        {/* API Gateway */}
        <div className={styles.item}>
          <div className={styles.label}>
            <Globe size={14} className={`${styles.icon} ${systemHealth.apiGateway === 'online' ? styles.onlineIcon : ''}`} />
            <span>API Gateway</span>
          </div>
          <Badge severity={systemHealth.apiGateway === 'online' ? 'success' : 'error'}>
            {systemHealth.apiGateway === 'online' ? 'ONLINE' : 'OFFLINE'}
          </Badge>
        </div>

        {/* Socket Server */}
        <div className={styles.item}>
          <div className={styles.label}>
            <Link2 size={14} className={`${styles.icon} ${systemHealth.socketServer === 'online' ? styles.onlineIcon : ''}`} />
            <span>Socket Server</span>
          </div>
          <Badge severity={systemHealth.socketServer === 'online' ? 'success' : 'error'}>
            {systemHealth.socketServer === 'online' ? 'ONLINE' : 'OFFLINE'}
          </Badge>
        </div>

        {/* MongoDB */}
        <div className={styles.item}>
          <div className={styles.label}>
            <Database size={14} className={`${styles.icon} ${systemHealth.mongodb === 'connected' ? styles.onlineIcon : ''}`} />
            <span>MongoDB Database</span>
          </div>
          <Badge 
            severity={
              systemHealth.mongodb === 'connected' ? 'success' :
              systemHealth.mongodb === 'connecting' ? 'warning' : 'error'
            }
          >
            {systemHealth.mongodb.toUpperCase()}
          </Badge>
        </div>

        {/* Redis */}
        <div className={styles.item}>
          <div className={styles.label}>
            <Server size={14} className={`${styles.icon} ${systemHealth.redis === 'connected' ? styles.onlineIcon : ''}`} />
            <span>Redis Cache</span>
          </div>
          <Badge 
            severity={
              systemHealth.redis === 'connected' ? 'success' :
              systemHealth.redis === 'connecting' ? 'warning' : 'error'
            }
          >
            {systemHealth.redis.toUpperCase()}
          </Badge>
        </div>

        {/* Worker Threads Pool */}
        <div className={styles.item}>
          <div className={styles.label}>
            <Cpu size={14} className={`${styles.icon} ${systemHealth.workerPool === 'nominal' ? styles.onlineIcon : ''}`} />
            <span>Worker Threads Pool</span>
          </div>
          <Badge 
            severity={
              systemHealth.workerPool === 'nominal' ? 'success' :
              systemHealth.workerPool === 'degraded' ? 'warning' : 'error'
            }
          >
            {systemHealth.workerPool.toUpperCase()}
          </Badge>
        </div>
      </div>
    </Panel>
  );
});

SystemHealthCard.displayName = 'SystemHealthCard';

export default SystemHealthCard;
