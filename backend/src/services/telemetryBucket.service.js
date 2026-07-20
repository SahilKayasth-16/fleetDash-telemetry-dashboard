import { TelemetryBucket } from '../models/TelemetryBucket.model.js';
import { logger } from '../logger/index.js';

export class TelemetryBucketService {
  /**
   * Stores a processed telemetry point using the MongoDB Bucket Pattern.
   * Groups records into hourly buckets using atomic operations to prevent race conditions.
   *
   * @param {Object} processedTelemetry - Processed telemetry object returned from worker thread.
   * @returns {Promise<Object>} The updated bucket document.
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
      new: true,
      runValidators: true,
    };

    try {
      return await TelemetryBucket.findOneAndUpdate(filter, update, options);
    } catch (error) {
      // 3. Graceful handling of MongoDB Duplicate Key (E11000) write errors.
      // Under high concurrency, two upsert calls might try to insert the same new bucket document simultaneously.
      // One transaction succeeds, and the other fails with E11000. Retrying once will now successfully append
      // to the newly created document.
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
        return await TelemetryBucket.findOneAndUpdate(filter, retryUpdate, {
          new: true,
          runValidators: true,
        });
      }
      logger.error(`Database failure writing telemetry bucket for ${vehicleId}:`, error);
      throw error;
    }
  }
}

// Export singleton instance of TelemetryBucketService
export const telemetryBucketService = new TelemetryBucketService();
export default telemetryBucketService;
