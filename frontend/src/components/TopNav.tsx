import React, { useState, useEffect } from 'react';
import { Menu, Wifi, WifiOff, Database, Server } from 'lucide-react';
import axios from 'axios';

interface TopNavProps {
  onMenuClick: () => void;
}

interface HealthResponse {
  status: string;
  mongodb: string;
  redis: string;
  uptime: number;
}

export const TopNav: React.FC<TopNavProps> = ({ onMenuClick }) => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    try {
      const response = await axios.get<HealthResponse>('/api/health');
      setHealth(response.data);
      setLoading(false);
    } catch {
      setHealth(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-semibold text-slate-400">Control Panel</h2>
        </div>
      </div>

      {/* Gateway status trackers */}
      <div className="flex items-center gap-4">
        {/* Gateway connection */}
        <div className="flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 border border-slate-700/50 text-xs">
          {health?.status === 'OK' ? (
            <>
              <Wifi className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span className="font-medium text-slate-300">API Gateway: Online</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3.5 w-3.5 text-rose-400" />
              <span className="font-medium text-slate-400">
                {loading ? 'API Gateway: Connecting...' : 'API Gateway: Offline'}
              </span>
            </>
          )}
        </div>

        {/* MongoDB connection */}
        <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 border border-slate-700/50 text-xs">
          <Database className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-medium text-slate-300">MongoDB:</span>
          {health?.mongodb === 'connected' ? (
            <span className="font-semibold text-emerald-400">Connected</span>
          ) : (
            <span className="font-semibold text-rose-400">Disconnected</span>
          )}
        </div>

        {/* Redis connection */}
        <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 border border-slate-700/50 text-xs">
          <Server className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-medium text-slate-300">Redis:</span>
          {health?.redis === 'connected' ? (
            <span className="font-semibold text-emerald-400">Connected</span>
          ) : (
            <span className="font-semibold text-rose-400">Disconnected</span>
          )}
        </div>
      </div>
    </header>
  );
};
