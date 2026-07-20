import React from 'react';
import { Search, Filter, ArrowUpDown, RefreshCw, Download } from 'lucide-react';

export const Telemetry: React.FC = () => {
  const telemetryRecords = [
    { vehicleId: 'TX-1094', timestamp: '2026-07-20 16:03:10', lat: '37.7749', lng: '-122.4194', speed: '62.4 mph', engineTemp: '98°C', fuelLevel: '78%', status: 'Normal' },
    { vehicleId: 'TX-1092', timestamp: '2026-07-20 16:03:09', lat: '34.0522', lng: '-118.2437', speed: '45.1 mph', engineTemp: '92°C', fuelLevel: '52%', status: 'Normal' },
    { vehicleId: 'TX-1077', timestamp: '2026-07-20 16:03:05', lat: '40.7128', lng: '-74.0060', speed: '0.0 mph', engineTemp: '84°C', fuelLevel: '14%', status: 'Low Fuel' },
    { vehicleId: 'TX-1091', timestamp: '2026-07-20 16:03:01', lat: '41.8781', lng: '-87.6298', speed: '58.0 mph', engineTemp: '96°C', fuelLevel: '90%', status: 'Normal' },
    { vehicleId: 'TX-1054', timestamp: '2026-07-20 16:02:44', lat: '29.7604', lng: '-95.3698', speed: '65.2 mph', engineTemp: '104°C', fuelLevel: '68%', status: 'High Temp' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Telemetry Log Analyzer</h1>
          <p className="text-slate-400 mt-1">High-throughput sensor event feeds from active vehicle transponders.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/10 transition-colors">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
            <Search className="h-4 w-4" />
          </span>
          <input 
            type="text" 
            placeholder="Search by Vehicle ID..." 
            className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2.5 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/20">
        <table className="w-full text-left text-sm text-slate-400 border-collapse">
          <thead className="bg-slate-900/60 text-slate-300 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Vehicle ID</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Coordinates (Lat, Lng)</th>
              <th className="px-6 py-4">
                <span className="flex items-center gap-1 cursor-pointer hover:text-white">
                  Speed <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
              <th className="px-6 py-4">Engine Temp</th>
              <th className="px-6 py-4">Fuel Level</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {telemetryRecords.map((record, index) => (
              <tr key={index} className="hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-200">{record.vehicleId}</td>
                <td className="px-6 py-4 text-xs font-mono">{record.timestamp}</td>
                <td className="px-6 py-4 text-xs font-mono">{record.lat}, {record.lng}</td>
                <td className="px-6 py-4 text-slate-300">{record.speed}</td>
                <td className="px-6 py-4 text-slate-300">{record.engineTemp}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 text-xs">{record.fuelLevel}</span>
                    <div className="h-1.5 w-16 rounded-full bg-slate-800">
                      <div 
                        className={`h-full rounded-full ${
                          parseInt(record.fuelLevel) < 20 ? 'bg-rose-500' : 'bg-indigo-500'
                        }`} 
                        style={{ width: record.fuelLevel }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                    record.status === 'Normal' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : record.status === 'Low Fuel' 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <p>Showing 1 to 5 of 142 entries</p>
        <div className="flex gap-1.5">
          <button className="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer" disabled>Previous</button>
          <button className="px-2.5 py-1 rounded bg-indigo-600 text-white font-medium shadow-sm">1</button>
          <button className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">2</button>
          <button className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">3</button>
          <button className="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">Next</button>
        </div>
      </div>
    </div>
  );
};
