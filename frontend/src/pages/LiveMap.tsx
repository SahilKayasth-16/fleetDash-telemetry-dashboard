import React from 'react';
import FleetMap from '../features/map/components/FleetMap';

export const LiveMap: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'slideUp 0.4s forwards' }}>
      <FleetMap />
    </div>
  );
};

export default LiveMap;
