import { workerPool } from '../workers/worker-pool.js';
import { isDatabaseConnected } from '../database/index.js';
import { isRedisConnected } from '../redis/index.js';

class RpsTracker {
  constructor(windowSizeSeconds = 10) {
    this.windowSize = windowSizeSeconds;
    this.buckets = new Uint32Array(windowSizeSeconds);
    this.bucketSeconds = new Uint32Array(windowSizeSeconds);
  }

  recordRequest() {
    const now = Math.floor(Date.now() / 1000);
    const index = now % this.windowSize;

    if (this.bucketSeconds[index] !== now) {
      this.buckets[index] = 1;
      this.bucketSeconds[index] = now;
    } else {
      this.buckets[index]++;
    }
  }

  getRps() {
    const now = Math.floor(Date.now() / 1000);
    let totalRequests = 0;

    for (let i = 0; i < this.windowSize; i++) {
      if (now - this.bucketSeconds[i] < this.windowSize) {
        totalRequests += this.buckets[i];
      }
    }
    return Number((totalRequests / this.windowSize).toFixed(2));
  }
}

class AverageTimeTracker {
  constructor() {
    this.totalCount = 0;
    this.totalTime = 0;
  }

  record(ms) {
    this.totalCount++;
    this.totalTime += ms;
  }

  getAverage() {
    if (this.totalCount === 0) return 0;
    return Number((this.totalTime / this.totalCount).toFixed(2));
  }
}

export class MetricsService {
  constructor() {
    this.serverStartTime = Date.now();
    this.totalTelemetryReceived = 0;
    this.totalTelemetryStored = 0;
    this.totalRedisPublished = 0;
    this.totalSocketBroadcasts = 0;
    this.activeSocketConnections = 0;

    this.rpsTracker = new RpsTracker(10);
    this.timeTracker = new AverageTimeTracker();
  }

  incrementTelemetryReceived() {
    this.totalTelemetryReceived++;
    this.rpsTracker.recordRequest();
  }

  incrementTelemetryStored() {
    this.totalTelemetryStored++;
  }

  incrementRedisPublished() {
    this.totalRedisPublished++;
  }

  incrementSocketBroadcasts() {
    this.totalSocketBroadcasts++;
  }

  setActiveSocketConnections(count) {
    this.activeSocketConnections = Math.max(0, count);
  }

  recordProcessingTime(ms) {
    this.timeTracker.record(ms);
  }

  getMetrics() {
    const uptimeSeconds = Math.floor((Date.now() - this.serverStartTime) / 1000);

    return {
      status: 'success',
      uptime: uptimeSeconds,
      requestsPerSecond: this.rpsTracker.getRps(),
      averageProcessingTimeMs: this.timeTracker.getAverage(),
      workers: workerPool.getPoolSize(),
      activeWorkerCount: workerPool.getBusyWorkerCount(),
      socketConnections: this.activeSocketConnections,
      telemetryReceived: this.totalTelemetryReceived,
      telemetryStored: this.totalTelemetryStored,
      redisPublished: this.totalRedisPublished,
      socketBroadcasts: this.totalSocketBroadcasts,
      mongodb: isDatabaseConnected() ? 'connected' : 'disconnected',
      redis: isRedisConnected() ? 'connected' : 'disconnected',
    };
  }
}

export const metricsService = new MetricsService();
export default metricsService;
