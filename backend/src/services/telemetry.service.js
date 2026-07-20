import { workerPool } from '../workers/worker-pool.js';
import { telemetryBucketService } from './telemetryBucket.service.js';

export class TelemetryService {
  /**
   * Pipeline orchestrator:
   * 1. Offloads CPU validation & normalization to WorkerPool threads.
   * 2. Saves the normalized results into MongoDB hourly buckets.
   *
   * @param {Object} payload - Raw telemetry JSON object from Express route.
   * @returns {Promise<Object>} Processed telemetry object.
   */
  async ingestTelemetry(payload) {
    // 1. Process payload in background thread
    const processedTelemetry = await workerPool.execute(payload);

    // 2. Persist in Mongoose hourly bucket
    await telemetryBucketService.storeTelemetry(processedTelemetry);

    return processedTelemetry;
  }
}

// Export singleton instance of TelemetryService
export const telemetryService = new TelemetryService();
export default telemetryService;
