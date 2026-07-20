import React from 'react';
import { Navigation, ZoomIn, ZoomOut, Maximize2, Compass, Layers, Shield } from 'lucide-react';

export const LiveMap: React.FC = () => {
  const trackedVehicles = [
    { name: 'Vehicle Alpha (TX-1094)', route: 'Route A-12', coordinates: '37.7749° N, 122.4194° W', speed: '62 mph', status: 'Moving' },
    { name: 'Vehicle Beta (TX-1092)', route: 'Route B-04', coordinates: '34.0522° N, 118.2437° W', speed: '45 mph', status: 'Moving' },
    { name: 'Vehicle Gamma (TX-1077)', route: 'Route C-09', coordinates: '40.7128° N, 74.0060° W', speed: '0 mph', status: 'Stopped' },
    { name: 'Vehicle Delta (TX-1091)', route: 'Route A-01', coordinates: '41.8781° N, 87.6298° W', speed: '58 mph', status: 'Moving' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Live Tracking Grid</h1>
          <p className="text-slate-400 mt-1">Simulated mapping viewport showing spatial coordinates.</p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
            <Layers className="h-3.5 w-3.5" /> Layers
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
            <Shield className="h-3.5 w-3.5" /> Geofences
          </button>
        </div>
      </div>

      {/* Main Map Split Pane */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        
        {/* Mock Map Canvas Wrapper */}
        <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950 relative flex items-center justify-center overflow-hidden min-h-[300px]">
          
          {/* Mock Grid Lines Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
          
          {/* Mock Compass Icon */}
          <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-slate-400">
            <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '20s' }} />
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-slate-900/90 border border-slate-800 rounded-lg p-1.5 text-slate-400 shadow-xl">
            <button className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition-colors"><ZoomIn className="h-4 w-4" /></button>
            <button className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition-colors"><ZoomOut className="h-4 w-4" /></button>
            <div className="h-px bg-slate-800 my-1"></div>
            <button className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition-colors"><Maximize2 className="h-4 w-4" /></button>
          </div>

          {/* Placeholder Graphic Notice */}
          <div className="text-center z-10 p-6 glass-panel max-w-sm rounded-xl">
            <Navigation className="h-8 w-8 text-indigo-400 mx-auto animate-bounce" />
            <h4 className="mt-4 font-bold text-white text-base">Canvas Mapping Interface</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Spatial map tracking engine is ready. HTML5 Canvas coordinates mapping, route trace-lines, and vehicle indicators will load here.
            </p>
          </div>
        </div>

        {/* Tracking List Sidebar Panel */}
        <div className="w-full lg:w-80 rounded-xl border border-slate-800 bg-slate-900/40 p-4 overflow-y-auto flex flex-col">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white text-sm">Tracked Transponders ({trackedVehicles.length})</h3>
            <p className="text-[11px] text-slate-500">Active status streams mapping</p>
          </div>
          <div className="mt-4 space-y-3 flex-1 min-h-0 overflow-y-auto">
            {trackedVehicles.map((vehicle, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-lg bg-slate-950/40 hover:bg-slate-950/70 border border-slate-850 hover:border-slate-800 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{vehicle.name}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                    vehicle.status === 'Moving' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                  <p>Route: <span className="font-medium text-slate-300">{vehicle.route}</span></p>
                  <p>Speed: <span className="font-medium text-slate-300">{vehicle.speed}</span></p>
                  <p className="truncate font-mono text-slate-500 text-[10px]">{vehicle.coordinates}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
