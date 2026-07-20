import React from 'react';
import { Save, RefreshCcw, Database, ShieldAlert, Cpu } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Settings</h1>
        <p className="text-slate-400 mt-1">Configure telemetry rules, geofencing thresholds, and server endpoint bindings.</p>
      </div>

      {/* Form Card Grid */}
      <div className="space-y-6">
        
        {/* Section 1: Ingestion API Config */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Telemetry Buffer Configuration</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Socket Buffer Window (ms)</label>
              <input 
                type="number" 
                defaultValue="200" 
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-350 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Parallel Worker Limit</label>
              <input 
                type="number" 
                defaultValue="4" 
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-350 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Database Storage Rules */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Database className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Data Retention Policies</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Raw Log Purge Cycle</label>
              <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-350 text-sm focus:outline-none focus:border-indigo-500">
                <option value="7">Purge logs older than 7 Days</option>
                <option value="30">Purge logs older than 30 Days</option>
                <option value="90">Purge logs older than 90 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Redis Stream Max Length</label>
              <input 
                type="number" 
                defaultValue="5000" 
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-350 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Geofencing Alerts */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldAlert className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Geofencing & Alerts</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Overspeed Threshold Limit</label>
              <input 
                type="number" 
                defaultValue="75" 
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-350 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="relative flex items-center cursor-pointer gap-2.5">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-500/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white"></div>
                <span className="text-xs font-semibold text-slate-300">Dispatch alerts for Geofence Exit breaches</span>
              </label>
            </div>
          </div>
        </div>

        {/* Control Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            <RefreshCcw className="h-4 w-4" /> Reset Default
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/10 transition-colors">
            <Save className="h-4 w-4" /> Save Settings
          </button>
        </div>

      </div>
    </div>
  );
};
