import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TelemetryState, FleetStats, Vehicle, TelemetryEvent, SystemHealth, ConnectionStatus } from '../types/telemetry';
import { initialTelemetryState } from '../data/placeholderData';

export type TelemetryAction =
  | { type: 'UPDATE_STATS'; payload: Partial<FleetStats> }
  | { type: 'UPDATE_SYSTEM_HEALTH'; payload: Partial<SystemHealth> }
  | { type: 'UPDATE_CONNECTION'; payload: Partial<ConnectionStatus> }
  | { type: 'UPDATE_VEHICLE'; payload: Vehicle }
  | { type: 'ADD_EVENT'; payload: TelemetryEvent };

const telemetryReducer = (state: TelemetryState, action: TelemetryAction): TelemetryState => {
  switch (action.type) {
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload },
      };
    case 'UPDATE_SYSTEM_HEALTH':
      return {
        ...state,
        systemHealth: { ...state.systemHealth, ...action.payload },
      };
    case 'UPDATE_CONNECTION':
      return {
        ...state,
        connection: { ...state.connection, ...action.payload },
      };
    case 'UPDATE_VEHICLE': {
      const exists = state.vehicles.some((v) => v.id === action.payload.id);
      const newVehicles = exists
        ? state.vehicles.map((v) => (v.id === action.payload.id ? action.payload : v))
        : [...state.vehicles, action.payload];
      return {
        ...state,
        vehicles: newVehicles,
      };
    }
    case 'ADD_EVENT':
      return {
        ...state,
        events: [action.payload, ...state.events].slice(0, 50),
      };
    default:
      return state;
  }
};

interface TelemetryContextType {
  state: TelemetryState;
  dispatch: React.Dispatch<TelemetryAction>;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(telemetryReducer, initialTelemetryState);

  return (
    <TelemetryContext.Provider value={{ state, dispatch }}>
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = (): TelemetryContextType => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
