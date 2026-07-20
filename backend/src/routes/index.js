import { Router } from 'express';
import healthRouter from './health.routes.js';
import telemetryRouter from './telemetry.routes.js';
import metricsRouter from './metrics.routes.js';

const router = Router();

// Mount routes
router.use('/', healthRouter);
router.use('/', telemetryRouter);
router.use('/', metricsRouter);

export default router;
