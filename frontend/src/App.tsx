import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TelemetryProvider } from './context/TelemetryContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { LiveMap } from './pages/LiveMap';
import { Vehicles } from './pages/Vehicles';
import { Telemetry } from './pages/Telemetry';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <TelemetryProvider>
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route element={<DashboardLayout />}>
            {/* Redirect root page to /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Active application pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live-map" element={<LiveMap />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/telemetry" element={<Telemetry />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Redirect any unknown route to /dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TelemetryProvider>
  );
};

export default App;
