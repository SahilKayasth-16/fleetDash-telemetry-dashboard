import { Router } from 'express';
import os from 'os';
import { isDatabaseConnected } from '../database/index.js';
import { isRedisConnected } from '../redis/index.js';
import { workerPool } from '../workers/worker-pool.js';
import { metricsService } from '../services/metrics.service.js';

const router = Router();

router.get('/health', (_req, res, next) => {
  try {
    const mongoStatus = isDatabaseConnected() ? 'connected' : 'disconnected';
    const redisStatus = isRedisConnected() ? 'connected' : 'disconnected';

    const memory = process.memoryUsage();
    const memoryUsageMb = {
      rss: Number((memory.rss / 1024 / 1024).toFixed(2)),
      heapTotal: Number((memory.heapTotal / 1024 / 1024).toFixed(2)),
      heapUsed: Number((memory.heapUsed / 1024 / 1024).toFixed(2)),
      external: Number((memory.external / 1024 / 1024).toFixed(2)),
    };

    res.json({
      status: 'OK',
      mongodb: mongoStatus,
      redis: redisStatus,
      uptime: process.uptime(),
      workerPool: {
        poolSize: workerPool.getPoolSize(),
        activeWorkers: workerPool.getBusyWorkerCount(),
        queueLength: workerPool.getActiveQueueLength(),
      },
      socket: {
        connections: metricsService.activeSocketConnections,
      },
      memoryUsage: memoryUsageMb,
      nodeVersion: process.version,
      cpuCount: os.cpus().length,
      platform: process.platform,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
