import http from 'http';
import app from './app.js';
import { config } from './config/index.js';
import { logger } from './logger/index.js';
import { connectDatabase, disconnectDatabase } from './database/index.js';
import { connectRedis, disconnectRedis } from './redis/index.js';

let server: http.Server;

async function startServer(): Promise<void> {
  try {
    // 1. Establish database connection
    await connectDatabase();

    // 2. Establish Redis connection
    connectRedis();

    // 3. Create HTTP Server
    server = http.createServer(app);

    // 4. Start listening
    server.listen(config.port, () => {
      logger.info(`🚀 FleetDash Backend listening on port ${config.port} in ${config.nodeEnv} mode`);
    });

    // 5. Setup signal interceptors for graceful shutdowns
    const handleShutdown = async (signal: string) => {
      logger.warn(`Received ${signal}. Starting graceful shutdown...`);

      // Close Express Server first to stop accepting new requests
      if (server) {
        server.close(async (err) => {
          if (err) {
            logger.error('Error closing HTTP server:', err);
          } else {
            logger.info('HTTP server closed successfully');
          }

          try {
            // Disconnect databases
            await disconnectDatabase();
            await disconnectRedis();
            logger.info('Graceful shutdown completed. Exiting process.');
            process.exit(0);
          } catch (dbError) {
            logger.error('Error during database disconnects:', dbError);
            process.exit(1);
          }
        });

        // Set a timeout to force exit if server takes too long to close
        setTimeout(() => {
          logger.error('Graceful shutdown timed out. Forcing process exit.');
          process.exit(1);
        }, 10000);
      } else {
        process.exit(0);
      }
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

  } catch (error) {
    logger.error('FATAL: Failed to start FleetDash application server:', error);
    process.exit(1);
  }
}

// Global unhandled promise rejection trap
process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection caught:', reason);
  // Optional: Gracefully restart or shutdown
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception caught:', error);
  // Force exit on uncaught exceptions is usually recommended
  process.exit(1);
});

// Boot the application
startServer();
