import { Router } from 'express';
import { metricsService } from '../services/metrics.service.js';

const router = Router();

router.get('/metrics', (_req, res, next) => {
  try {
    const currentMetrics = metricsService.getMetrics();
    res.json(currentMetrics);
  } catch (error) {
    next(error);
  }
});

export default router;
