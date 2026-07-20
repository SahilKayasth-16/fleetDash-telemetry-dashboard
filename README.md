# FleetDash — High-Throughput Event-Driven Fleet Telemetry Dashboard

FleetDash is a production-grade, highly-scalable monorepo designed for high-throughput, event-driven fleet telemetry tracking and visual telemetry observation. This architecture lays down a robust foundation for handling real-time IoT feeds, parsing telemetry streams via background workers, and feeding updates into a React dashboard using event streams.

---

## Architecture Overview

FleetDash operates on a decoupled client-server architecture built for low latency and high scalability:

1. **Express App Server**: Acts as the central control plane managing configurations, REST requests, authentication, and serving metadata.
2. **Telemetry Ingestion Gate (Future)**: High-throughput ingestion entrypoint that processes high-velocity fleet event packets.
3. **Background Worker Processing (Future)**: Leverages Node.js `worker_threads` to parse and compute stream metrics out-of-process, keeping the main event loop unblocked.
4. **Mongoose (MongoDB)**: Used to store persistent configuration, fleet profiles, and aggregated analytical telemetry metrics.
5. **Redis Cache & Pub/Sub**: Manages transient event buffers, active sockets, and scales the event pipeline.
6. **Vite + React Frontend**: A responsive tailwind-styled single page dashboard tracking Live Maps, Telemetry tables, Alerts, and settings.

---

## Tech Stack

### Backend
* **Core**: Node.js (Latest LTS), Express.js, TypeScript (Strict)
* **Databases**: MongoDB (Mongoose), Redis (ioredis)
* **Tooling**: Zod (validation), dotenv (environment management), Winston (structured logging), tsx (Typescript execution), Nodemon (hot-reloading)
* **Middleware**: Helmet (security headers), Cors (cross-origin sharing), Morgan (HTTP logger), Compression (gzip/deflate utility)
* **Code Quality**: ESLint, Prettier

### Frontend
* **Core**: React, TypeScript, Vite
* **Routing**: React Router
* **Networking**: Axios, Socket.io Client
* **Styling**: Tailwind CSS v4

---

## Folder Structure

```
FleetDash/
├── backend/
│   ├── src/
│   │   ├── config/          # Zod-verified environment definitions
│   │   ├── database/        # Mongoose/MongoDB connection wrapper
│   │   ├── redis/           # Redis client client setup (ioredis)
│   │   ├── logger/          # Console & file Winston logging stream
│   │   ├── middleware/      # Morgan parser, global error bounds, compression
│   │   ├── routes/          # REST Endpoint routes
│   │   ├── controllers/     # Controller boundaries (placeholder)
│   │   ├── models/          # Mongoose collections schema mapping (placeholder)
│   │   ├── services/        # Business logic services (placeholder)
│   │   ├── workers/         # Multi-threaded telemetric processing (placeholder)
│   │   ├── socket/          # Socket.io connection adapters (placeholder)
│   │   ├── utils/           # Utility helpers (placeholder)
│   │   ├── types/           # App-wide Type declarations (placeholder)
│   │   ├── interfaces/      # App-wide interfaces (placeholder)
│   │   ├── constants/       # App-wide constants (placeholder)
│   │   ├── app.ts           # Express Application definition
│   │   └── server.ts        # Main listener, DB attachments, signal traps
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── tsconfig.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # UI components (Sidebar, Top Navigation)
│   │   ├── pages/           # Placeholders: Dashboard, Live Map, Telemetry, Alerts, Settings
│   │   ├── layouts/         # DashboardLayout layout wrapper
│   │   ├── hooks/           # Custom React hooks (placeholder)
│   │   ├── services/        # Client API connections
│   │   ├── context/         # React context bindings (placeholder)
│   │   ├── types/           # Frontend TypeScript types (placeholder)
│   │   ├── utils/           # Helper utility libraries (placeholder)
│   │   ├── App.tsx          # Application Router & Routing Core
│   │   └── main.tsx         # Root DOM renderer
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── README.md
└── .gitignore
```

---

## Development Setup

### Prerequisites
Make sure you have the following installed on your machine:
* Node.js (Latest LTS version 20.x or above)
* MongoDB (Running locally or via cloud URI)
* Redis Server (Running locally or via cloud instance)

### Installation
Clone the repository and run dependencies installer in both packages:

1. **Backend Dependencies Setup**:
   ```bash
   cd backend
   npm install
   ```

2. **Frontend Dependencies Setup**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

1. Create a `.env` configuration file inside `/backend` from the provided example:
   ```bash
   cp .env.example .env
   ```
   *Modify the MongoDB and Redis variables in `.env` if your credentials differ.*

2. Run the Express API server:
   ```bash
   cd backend
   npm run dev
   ```
   The backend server runs at `http://localhost:5000`.

3. Run the React Web Dashboard:
   ```bash
   cd frontend
   npm run dev
   ```
   The Vite dev server will host the frontend at `http://localhost:5173` with a reverse-proxy routing `/api` traffic to the backend.

---

## Future Modules
The architectural layout of FleetDash is prepared to integrate:
* **High-Throughput Telemetry Ingestion Logic**: API endpoints and streams optimized for handling telemetry reports from thousands of active vehicles.
* **Worker Thread Multiprocessing**: Offloading CPU-bound tasks like parsing JSON coordinates or calculating sensor trends away from the single-threaded Node server onto worker threads.
* **Socket.io Real-Time Streaming**: Real-time push logic to pipe telemetry streams instantly onto the frontend map.
* **HTML5 Canvas Map Rendering**: High-performance Canvas renderer to trace historical paths and active coordinates of vehicles.
* **Geofencing Computations**: Trigger automated boundaries notifications when a vehicle enters or exits defined spatial polygons.
