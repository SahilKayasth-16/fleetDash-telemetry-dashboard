export interface MapCoordinate {
  lat: number;
  lng: number;
}

export interface MapViewport {
  center: MapCoordinate;
  zoom: number;
}

export interface IMapControls {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  centerFleet: () => void;
  toggleFullscreen: () => void;
}

// Abstract interface for future Map Library (e.g. Leaflet, Mapbox, or Custom GL)
export interface IMapAdapter {
  initialize(container: HTMLDivElement, initialViewport: MapViewport): Promise<void>;
  destroy(): void;
  addVehicles(vehicles: Array<{ id: string; lat: number; lng: number; speed: number; heading: number; status: string }>): void;
  removeVehicles(vehicleIds: string[]): void;
  updateVehicle(id: string, updates: { lat?: number; lng?: number; speed?: number; heading?: number; status?: string }): void;
  setViewport(center: MapCoordinate, zoom: number): void;
  zoomIn(): void;
  zoomOut(): void;
}

// Canvas-Ready Architecture interfaces
export interface ICanvasRenderer {
  init(canvas: HTMLCanvasElement): void;
  resize(width: number, height: number): void;
  render(vehicles: Array<{ id: string; lat: number; lng: number; heading: number; status: string }>, viewport: MapViewport): void;
  clear(): void;
}

export interface IVehicleRenderer {
  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    heading: number,
    status: string,
    isSelected: boolean
  ): void;
}

export interface ILayerRenderer {
  drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, zoom: number): void;
  drawGeofences(ctx: CanvasRenderingContext2D, width: number, height: number, scale: number): void;
}
