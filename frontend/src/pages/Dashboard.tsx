import React from 'react';
import { 
  Truck, 
  AlertTriangle, 
  MapPin, 
  Cpu, 
  Clock, 
  Compass 
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Active Fleet Vehicles', value: '1,248', change: '+12% from last hour', icon: Truck, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { title: 'Critical Warnings', value: '4', change: '-2 resolved recently', icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { title: 'Average Speed', value: '62.4 mph', change: 'Optimal fuel performance', icon: Compass, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Processor Load', value: '14.8%', change: 'Worker threads idle', icon: Cpu, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Overview</h1>
        <p className="text-slate-400 mt-1">Real-time status of high-throughput telemetry pipelines.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.title} 
              className={`rounded-xl border bg-slate-900/60 p-5 backdrop-blur-sm transition-transform duration-200 hover:scale-[1.01] ${stat.color.split(' ')[2]}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{stat.title}</span>
                <div className={`rounded-lg p-2 border ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
                <p className="mt-1 text-xs text-slate-400 font-medium">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid for activity feeds and queues */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Telemetry Stream Queue Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-semibold text-white">Ingestion Queue Logs</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400 border border-indigo-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 pulse-stream"></span>
              Live Feed
            </span>
          </div>
          <div className="mt-4 space-y-3.5">
            {[
              { id: 'TX-1094', event: 'Sensor batch processed', speed: '62 mph', status: 'SUCCESS', time: '1s ago' },
              { id: 'TX-1092', event: 'Route threshold crossed', speed: '45 mph', status: 'SUCCESS', time: '4s ago' },
              { id: 'TX-1077', event: 'Overspeed warning trigger', speed: '81 mph', status: 'WARNING', time: '12s ago' },
              { id: 'TX-1091', event: 'Gps handshake established', speed: '0 mph', status: 'SUCCESS', time: '1m ago' },
            ].map((log, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm border-b border-slate-800/40 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300">
                    {log.id.split('-')[1]}
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">{log.event}</p>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {log.time}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${
                    log.status === 'WARNING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Cluster Details */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-semibold text-white">Cluster Resource Mapping</h3>
            <span className="text-xs text-slate-400 font-medium">Node: AWS-USE-1</span>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Geofencing Core Latency</span>
                <span>4.2 ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-indigo-500" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5" /> Redis Memory Usage</span>
                <span>38 MB / 512 MB</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-sky-500" style={{ width: '12%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Telemetry Buffer Packets</span>
                <span>24,809 / 100,000</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
