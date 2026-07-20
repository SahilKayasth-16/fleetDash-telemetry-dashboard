import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/index.js';
import { config } from '../config/index.js';

export interface AppError extends Error {
  statusCode?: number;
  errors?: unknown;
}

// Global error handling middleware
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error processing request: ${req.method} ${req.originalUrl}`, {
    statusCode,
    message,
    stack: err.stack,
    errors: err.errors,
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(config.isProduction ? {} : { stack: err.stack, errors: err.errors }),
  });
}

// 404 Route Not Found middleware
export function notFoundHandler(req: Request, res: Response): void {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Cannot perform ${req.method} on ${req.originalUrl}`,
  });
}
