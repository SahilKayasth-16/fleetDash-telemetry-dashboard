import mongoose from 'mongoose';

// Schema for individual telemetry points stored within the hourly bucket array.
// Disabling _id saves storage space in MongoDB since points are only read as subdocuments.
const telemetryPointSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: { type: Number, required: true },
    heading: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  },
  { _id: false },
);

// Main schema for TelemetryBucket using the MongoDB Bucket Pattern.
// Aggregates high-frequency telemetry updates into hourly documents to reduce index footprints.
const telemetryBucketSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      trim: true,
    },
    bucketStartTime: {
      type: Date,
      required: true,
    },
    bucketEndTime: {
      type: Date,
      required: true,
    },
    telemetryPoints: [telemetryPointSchema],
    pointCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Auto-manage createdAt and updatedAt fields for the bucket
    collection: 'telemetry_buckets',
  },
);

/**
 * -----------------------------------------------------------------------------
 * MongoDB Indexes Configuration
 * -----------------------------------------------------------------------------
 *
 * 1. Compound Unique Index: { vehicleId: 1, bucketStartTime: -1 }
 *    - Purpose: Speeds up upserts and retrieval queries looking for a specific vehicle's
 *      time intervals. The unique constraint prevents duplicate hourly documents per vehicle under
 *      high-concurrency transponder ingestion stress.
 *
 * 2. Single Index: { bucketStartTime: -1 }
 *    - Purpose: Supports quick time-range scans across all vehicles (e.g. general active fleet reporting)
 *      and simplifies data retention TTL purge queries.
 */
telemetryBucketSchema.index({ vehicleId: 1, bucketStartTime: -1 }, { unique: true });
telemetryBucketSchema.index({ bucketStartTime: -1 });

export const TelemetryBucket = mongoose.model('TelemetryBucket', telemetryBucketSchema);
export default TelemetryBucket;
