import { TelemetryBucket } from '../models/TelemetryBucket.model.js';
import { logger } from '../logger/index.js';
import { metricsService } from './metrics.service.js';

export class TelemetryBucketService {
  /**
   * Stores a processed telemetry point using the MongoDB Bucket Pattern.
   * Groups records into hourly buckets using atomic operations to prevent race conditions.
   *
   * @param {Object} processedTelemetry - Processed telemetry object returned from worker thread.
   * @returns {Promise<Object>} Write result object.
   */
  async storeTelemetry(processedTelemetry) {
    const { vehicleId, latitude, longitude, speed, heading, timestamp } = processedTelemetry;

    // 1. Calculate hourly bucket time boundaries
    // e.g. 10:35:12 AM -> 10:00:00 AM
    const dateObj = new Date(timestamp);
    const bucketStartTime = new Date(Math.floor(dateObj.getTime() / (3600 * 1000)) * (3600 * 1000));
    const bucketEndTime = new Date(bucketStartTime.getTime() + 3600 * 1000);

    const filter = { vehicleId, bucketStartTime };

    // 2. Build atomic update payload
    const update = {
      $setOnInsert: { bucketEndTime },
      $push: {
        telemetryPoints: {
          latitude,
          longitude,
          speed,
          heading,
          timestamp: dateObj,
        },
      },
      $inc: { pointCount: 1 },
    };

    const options = {
      upsert: true,
      runValidators: true,
    };

    try {
      const result = await TelemetryBucket.updateOne(filter, update, options);
      metricsService.incrementTelemetryStored();
      return result;
    } catch (error) {
      // 3. Graceful handling of MongoDB Duplicate Key (E11000) write errors.
      if (error.code === 11000) {
        logger.warn(`Concurrently hit duplicate bucket. Retrying storage append for ${vehicleId}`);
        // Remove $setOnInsert since the document is guaranteed to exist now
        const retryUpdate = {
          $push: {
            telemetryPoints: {
              latitude,
              longitude,
              speed,
              heading,
              timestamp: dateObj,
            },
          },
          $inc: { pointCount: 1 },
        };
        const result = await TelemetryBucket.updateOne(filter, retryUpdate, {
          runValidators: true,
        });
        metricsService.incrementTelemetryStored();
        return result;
      }
      logger.error(`Database failure writing telemetry bucket for ${vehicleId}:`, error);
      throw error;
    }
  }
}

// Export singleton instance of TelemetryBucketService
export const telemetryBucketService = new TelemetryBucketService();
export default telemetryBucketService;
