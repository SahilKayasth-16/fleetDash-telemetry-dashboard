import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { config } from './config/index.js';
import { logger } from './logger/index.js';
import apiRouter from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app: Application = express();

// Set security headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: config.corsOrigin === '*' ? '*' : config.corsOrigin.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Compression middleware (gzip)
app.use(compression());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Setup HTTP request logging via morgan piped to winston
const morganFormat = config.isProduction ? 'combined' : 'dev';
const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};
app.use(morgan(morganFormat, { stream: morganStream }));

// Mount API routes under /api (recommended for standard architectures) or mount root for health
app.use('/api', apiRouter);
// Fallback path mapping at root level too (specifically for GET /health if needed directly)
app.use('/', apiRouter);

// Handle 404 Route Not Found
app.use(notFoundHandler);

// Handle Global App Errors
app.use(errorHandler);

export default app;
