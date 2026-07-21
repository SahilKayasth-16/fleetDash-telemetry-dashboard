import React from 'react';
import { Truck, Zap, Gauge, Wifi } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import StatCard from '../ui/StatCard';
import IconWrapper from '../ui/IconWrapper';

export const FleetStatsCards: React.FC = React.memo(() => {
  const { state } = useTelemetry();
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
        title="Online Gateways"
        value={stats.onlineConnections}
        trend={stats.connectionsTrend}
        trendType="positive"
        glow="cyan"
        icon={
          <IconWrapper theme="success" size="md">
            <Wifi size={18} />
          </IconWrapper>
        }
      />
    </>
  );
});

FleetStatsCards.displayName = 'FleetStatsCards';

export default FleetStatsCards;
