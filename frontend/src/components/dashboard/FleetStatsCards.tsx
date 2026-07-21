import React from 'react';
import { Truck, Zap, Gauge, Wifi } from 'lucide-react';
import { useTelemetry } from '../../hooks/useTelemetry';
import StatCard from '../ui/StatCard';
import IconWrapper from '../ui/IconWrapper';

export const FleetStatsCards: React.FC = React.memo(() => {
  const { state, connectionStatus } = useTelemetry();
  const { stats } = state;

  return (
    <>
      <StatCard
        title="Active Vehicles"
        value={stats.activeVehicles}
        trend={stats.activeVehiclesTrend}
        trendType="positive"
        glow="cyan"
        icon={
          <IconWrapper theme="cyan" size="md">
            <Truck size={18} />
          </IconWrapper>
        }
      />

      <StatCard
        title="Total Telemetry Events"
        value={stats.totalTelemetryEvents.toLocaleString()}
        trend={stats.eventsTrend}
        trendType="positive"
        glow="purple"
        icon={
          <IconWrapper theme="purple" size="md">
            <Zap size={18} />
          </IconWrapper>
        }
      />

      <StatCard
        title="Average Speed"
        value={`${stats.averageSpeed.toFixed(1)} MPH`}
        trend={stats.speedTrend}
        trendType="neutral"
        glow="blue"
        icon={
          <IconWrapper theme="blue" size="md">
            <Gauge size={18} />
          </IconWrapper>
        }
      />

      <StatCard
        title="Connection Status"
        value={connectionStatus.toUpperCase()}
        trend={`${stats.onlineConnections} active gateway connections`}
        trendType={connectionStatus === 'connected' ? 'positive' : 'negative'}
        glow={connectionStatus === 'connected' ? 'cyan' : 'purple'}
        icon={
          <IconWrapper theme={connectionStatus === 'connected' ? 'success' : 'warning'} size="md">
            <Wifi size={18} />
          </IconWrapper>
        }
      />
    </>
  );
});

FleetStatsCards.displayName = 'FleetStatsCards';

export default FleetStatsCards;
