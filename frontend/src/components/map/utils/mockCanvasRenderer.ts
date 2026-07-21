import { ICanvasRenderer, IVehicleRenderer, ILayerRenderer, MapViewport } from '../types/map';

export class MockVehicleRenderer implements IVehicleRenderer {
  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    heading: number,
    status: string,
    isSelected: boolean
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((heading * Math.PI) / 180);
    
    // Draw arrow shape
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(-5, 5);
    ctx.lineTo(5, 5);
    ctx.closePath();
    
    if (status === 'active') {
      ctx.fillStyle = '#00ffd2'; // Neon green
    } else if (status === 'warning') {
      ctx.fillStyle = '#ffb700'; // Warning amber
    } else if (status === 'stopped') {
      ctx.fillStyle = '#00c8ff'; // Stopped cyan
    } else {
      ctx.fillStyle = '#475569'; // Muted grey
    }
    ctx.fill();

    // Selection highlight ring
    if (isSelected) {
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    ctx.restore();
  }
}

export class MockLayerRenderer implements ILayerRenderer {
  drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, zoom: number): void {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
    ctx.lineWidth = 1;
    
    const spacing = 40 * (zoom / 13);
    for (let x = 0; x < width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawGeofences(ctx: CanvasRenderingContext2D, width: number, height: number, scale: number): void {
    ctx.save();
    ctx.strokeStyle = 'rgba(174, 0, 255, 0.25)';
    ctx.fillStyle = 'rgba(174, 0, 255, 0.03)';
    ctx.lineWidth = 1.5;
    
    // Centered geofence boundary circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 70 * scale, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

export class MockCanvasRenderer implements ICanvasRenderer {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private vehicleRenderer = new MockVehicleRenderer();
  private layerRenderer = new MockLayerRenderer();

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  resize(width: number, height: number): void {
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  render(
    vehicles: Array<{ id: string; lat: number; lng: number; heading: number; status: string }>,
    viewport: MapViewport
  ): void {
    if (!this.ctx || !this.canvas) return;
    this.clear();
    
    const { width, height } = this.canvas;
    
    // 1. Draw grids
    this.layerRenderer.drawGrid(this.ctx, width, height, viewport.zoom);
    
    // 2. Draw geofences
    this.layerRenderer.drawGeofences(this.ctx, width, height, viewport.zoom / 13);
    
    // 3. Draw vehicles
    vehicles.forEach((vehicle, idx) => {
      const x = width * 0.15 + (idx * 60) % (width * 0.7);
      const y = height * 0.2 + (idx * 40) % (height * 0.6);
      
      this.vehicleRenderer.draw(this.ctx!, x, y, vehicle.heading || 0, vehicle.status, idx === 0);
    });
  }

  clear(): void {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
export default MockCanvasRenderer;
