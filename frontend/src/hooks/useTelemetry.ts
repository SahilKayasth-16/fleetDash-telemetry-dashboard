import { useContext } from 'react';
import TelemetryContext, { TelemetryContextType } from '../context/TelemetryContext';

/**
 * Custom hook to consume real-time vehicle telemetry, stats, and socket connection controls.
 * Must be used within a TelemetryProvider.
 */
export const useTelemetry = (): TelemetryContextType => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};

export default useTelemetry;
