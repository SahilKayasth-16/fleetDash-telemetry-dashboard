import React from 'react';
import FleetMap from '../components/map/FleetMap';
import FleetStatsCards from '../components/dashboard/FleetStatsCards';
import VehicleListPanel from '../components/dashboard/VehicleListPanel';
import RecentEventsPanel from '../components/dashboard/RecentEventsPanel';
import SystemHealthCard from '../components/dashboard/SystemHealthCard';
import ConnectionStatusCard from '../components/dashboard/ConnectionStatusCard';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>System Control Overview</h1>
        <p className={styles.subtitle}>Real-time status tracking and high-throughput event ingestion pipelines.</p>
      </div>

      {/* Map Section - modular FleetMap component */}
      <div className={styles.mapSection}>
        <FleetMap />
      </div>

      {/* Dashboard Panel - Fleet Statistics Cards */}
      <div className={styles.metricsGrid}>
        <FleetStatsCards />
      </div>

      {/* Status Section - Extended into a responsive 3-column control center */}
      <div className={styles.statusGrid}>
        <VehicleListPanel />
        <RecentEventsPanel />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--grid-gap)' }}>
          <SystemHealthCard />
          <ConnectionStatusCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
