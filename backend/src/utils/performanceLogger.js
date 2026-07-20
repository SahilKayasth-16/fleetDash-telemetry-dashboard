import { logger } from '../logger/index.js';
import { metricsService } from '../services/metrics.service.js';
import { workerPool } from '../workers/worker-pool.js';

let loggerInterval = null;

export function startPerformanceLogger(intervalMs = 30000) {
  if (loggerInterval) return;

  logger.info(`📊 Starting Performance Logger interval: ${intervalMs}ms`);

  loggerInterval = setInterval(() => {
    try {
      const metrics = metricsService.getMetrics();
      const memory = process.memoryUsage();
      const heapUsedMb = (memory.heapUsed / 1024 / 1024).toFixed(2);
      const rssMb = (memory.rss / 1024 / 1024).toFixed(2);

      logger.info(
        `[PERFORMANCE LOG] ` +
          `RPS: ${metrics.requestsPerSecond} | ` +
          `Memory (Heap/RSS): ${heapUsedMb}MB / ${rssMb}MB | ` +
          `Workers (Busy/Total): ${metrics.activeWorkerCount}/${metrics.workers} | ` +
          `Redis: ${metrics.redis} | ` +
          `Sockets: ${metrics.socketConnections} | ` +
          `Queue Length: ${workerPool.getActiveQueueLength()}`,
      );
    } catch (error) {
      logger.error('Error in Performance Logger interval:', error);
    }
  }, intervalMs);
}

export function stopPerformanceLogger() {
  if (loggerInterval) {
    clearInterval(loggerInterval);
    loggerInterval = null;
    logger.info('📊 Stopped Performance Logger interval.');
  }
}
