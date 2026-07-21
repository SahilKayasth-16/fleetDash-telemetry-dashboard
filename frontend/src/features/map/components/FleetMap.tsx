import React, { useCallback } from 'react';
import { useTelemetry } from '../../../hooks/useTelemetry';
import useMap from '../hooks/useMap';
import MapContainer from './MapContainer';
import MapPlaceholder from './MapPlaceholder';
import VehicleLayer from './VehicleLayer';
import MapOverlay from './MapOverlay';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import containerStyles from './MapContainer.module.css';

export const FleetMap: React.FC = React.memo(() => {
  const { state } = useTelemetry();
  const { vehicles } = state;
  
  const {
    viewport,
    isFullscreen,
    toggleFullscreen,
    selectedVehicleId,
    selectVehicle,
    zoomIn,
    zoomOut,
    resetView,
    centerFleet,
  } = useMap();

  const handleCenterFleet = useCallback(() => {
    const coords = vehicles
      .filter((v) => v.status !== 'offline')
      .map((v) => ({ lat: v.latitude, lng: v.longitude }));
    centerFleet(coords);
  }, [vehicles, centerFleet]);

  const containerClass = isFullscreen ? containerStyles.fullscreen : '';

  return (
    <MapContainer
      title="Telemetry Spatial Tracking"
      subtitle="Simulated mapping viewport showing active transponder coordinates"
      className={containerClass}
    >
      {/* Visual HUD background elements */}
      <MapPlaceholder />

      {/* Interactive vehicle marker dots */}
      <VehicleLayer
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={selectVehicle}
      />

      {/* Target details and telemetry overlay reading widgets */}
      <MapOverlay
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={selectVehicle}
        zoom={viewport.zoom}
      />

      {/* Status indicator codes legend */}
      <MapLegend />

      {/* HUD diagnostic control button parameters */}
      <MapControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetView={resetView}
        onCenterFleet={handleCenterFleet}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </MapContainer>
  );
});

FleetMap.displayName = 'FleetMap';

export default FleetMap;
