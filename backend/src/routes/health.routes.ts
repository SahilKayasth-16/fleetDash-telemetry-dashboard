import { Router, Request, Response, NextFunction } from 'express';
import { isDatabaseConnected } from '../database/index.js';
import { isRedisConnected } from '../redis/index.js';

const router = Router();

router.get('/health', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const mongoStatus = isDatabaseConnected() ? 'connected' : 'disconnected';
    const redisStatus = isRedisConnected() ? 'connected' : 'disconnected';

    res.json({
      status: 'OK',
      mongodb: mongoStatus,
      redis: redisStatus,
      uptime: process.uptime(),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
