import axios from 'axios';
import { io, Socket } from 'socket.io-client';

// 1. Axios HTTP client instance config
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for unified error parsing
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = error.response?.data?.message || 'A network error occurred';
    return Promise.reject(new Error(customError));
  },
);

// 2. Socket.io socket client instance connection placeholder
// This initializes the socket client connection shell without starting/implementing handlers.
let socketInstance: Socket | null = null;

export function getSocketConnection(): Socket {
  if (socketInstance) {
    return socketInstance;
  }

  // Socket url binds to current window origin (which passes through proxy or directly to backend)
  socketInstance = io(window.location.origin, {
    autoConnect: false, // Prevents automatic connection in baseline foundation phase
    transports: ['websocket'],
  });

  return socketInstance;
}
