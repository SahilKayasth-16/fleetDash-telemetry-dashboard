import React from 'react';
import { ShieldAlert, WifiOff, Zap, ShieldCheck } from 'lucide-react';

export const Alerts: React.FC = () => {
  const alerts = [
    { id: 'AL-9042', vehicleId: 'TX-1077', category: 'Geofencing', title: 'Geofence Exit Boundary Breach', desc: 'Vehicle exited authorized commercial sector zone: San Francisco West District', severity: 'CRITICAL', icon: ShieldAlert, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { id: 'AL-9039', vehicleId: 'TX-1054', category: 'Sensor', title: 'High Engine Temperature Alert', desc: 'Sensor logged 104°C (Normal boundary max 100°C) during steep incline climb', severity: 'WARNING', icon: Zap, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { id: 'AL-9031', vehicleId: 'TX-1077', category: 'Hardware', title: 'Sensor Disconnected Warning', desc: 'Battery level drops below 5% on backup GPS transmitter device', severity: 'WARNING', icon: WifiOff, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { id: 'AL-9022', vehicleId: 'TX-1094', category: 'Geofencing', title: 'Geofence Entry Notification', desc: 'Vehicle entered refueling depot grid terminal safely', severity: 'INFO', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Alert Warnings Queue</h1>
          <p className="text-slate-400 mt-1">Automatic real-time geofence breaches and sensor warning log triggers.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
          Clear All Logs
        </button>
      </div>

      {/* Grid List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div 
              key={alert.id} 
              className={`rounded-xl border bg-slate-900/40 p-5 backdrop-blur-sm flex gap-4 items-start ${alert.color.split(' ')[2]}`}
            >
              <div className={`rounded-lg p-2.5 border shrink-0 ${alert.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{alert.category}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-semibold text-indigo-400">{alert.vehicleId}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide ${
                    alert.severity === 'CRITICAL' 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                      : alert.severity === 'WARNING'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">{alert.title}</h3>
                <p className="text-sm text-slate-400">{alert.desc}</p>
                <div className="pt-2 text-[10px] text-slate-500 font-medium">
                  Log ID: {alert.id} • Trigger Time: Just now
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
