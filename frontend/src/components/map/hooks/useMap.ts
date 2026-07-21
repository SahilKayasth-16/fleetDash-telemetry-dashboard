import { useState, useCallback } from 'react';
import { MapViewport, MapCoordinate } from '../types/map';

const DEFAULT_CENTER: MapCoordinate = { lat: 37.7749, lng: -122.4194 }; // San Francisco base
const DEFAULT_ZOOM = 13;

export const useMap = () => {
  const [viewport, setViewportState] = useState<MapViewport>({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const zoomIn = useCallback(() => {
    setViewportState((prev) => ({
      ...prev,
      zoom: Math.min(prev.zoom + 1, 18),
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setViewportState((prev) => ({
      ...prev,
      zoom: Math.max(prev.zoom - 1, 3),
    }));
  }, []);

  const resetView = useCallback(() => {
    setViewportState({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });
  }, []);

  const centerFleet = useCallback((coordinates: MapCoordinate[]) => {
    if (coordinates.length === 0) return;
    
    // Calculate average bounding box center
    let sumLat = 0;
    let sumLng = 0;
    coordinates.forEach((coord) => {
      sumLat += coord.lat;
      sumLng += coord.lng;
    });

    setViewportState({
      center: {
        lat: sumLat / coordinates.length,
        lng: sumLng / coordinates.length,
      },
      zoom: DEFAULT_ZOOM,
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const selectVehicle = useCallback((id: string | null) => {
    setSelectedVehicleId(id);
  }, []);

  return {
    viewport,
    setViewport: setViewportState,
    isFullscreen,
    toggleFullscreen,
    selectedVehicleId,
    selectVehicle,
    zoomIn,
    zoomOut,
    resetView,
    centerFleet,
  };
};

export default useMap;
