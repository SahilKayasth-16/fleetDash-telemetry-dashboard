import { VehicleTelemetry } from '../types/telemetry';

/**
 * Deserializes a binary payload back into a telemetry object.
 * Supports ArrayBuffer, Uint8Array/Buffer, or JSON-serialized Buffer objects.
 */
export function deserializeTelemetry(data: any): VehicleTelemetry {
  let arrayBuffer: ArrayBuffer;

  if (data instanceof ArrayBuffer) {
    arrayBuffer = data;
  } else if (data && data.buffer instanceof ArrayBuffer) {
    const typedArray = data as Uint8Array;
    arrayBuffer = (typedArray.buffer as ArrayBuffer).slice(
      typedArray.byteOffset,
      typedArray.byteOffset + typedArray.byteLength
    );
  } else if (data && typeof data === 'object' && data.type === 'Buffer' && Array.isArray(data.data)) {
    arrayBuffer = new Uint8Array(data.data).buffer as ArrayBuffer;
  } else {
    throw new Error('Unsupported binary data type for telemetry deserialization');
  }

  const view = new DataView(arrayBuffer);
  let offset = 0;

  // 1. Read vehicleId length (1 byte, Uint8)
  if (offset + 1 > view.byteLength) {
    throw new Error('Malformed binary telemetry data: truncated length byte');
  }
  const vehicleIdLength = view.getUint8(offset);
  offset += 1;

  // 2. Read vehicleId string (utf-8)
  if (offset + vehicleIdLength > view.byteLength) {
    throw new Error('Malformed binary telemetry data: truncated vehicleId string');
  }
  const idBytes = new Uint8Array(arrayBuffer, offset, vehicleIdLength);
  const decoder = new TextDecoder('utf-8');
  const vehicleId = decoder.decode(idBytes);
  offset += vehicleIdLength;

  // 3. Read latitude (8 bytes, Float64 / Double)
  if (offset + 8 > view.byteLength) {
    throw new Error('Malformed binary telemetry data: truncated latitude');
  }
  const latitude = view.getFloat64(offset, true); // true for little endian
  offset += 8;

  // 4. Read longitude (8 bytes, Float64 / Double)
  if (offset + 8 > view.byteLength) {
    throw new Error('Malformed binary telemetry data: truncated longitude');
  }
  const longitude = view.getFloat64(offset, true);
  offset += 8;

  // 5. Read speed (4 bytes, Float32)
  if (offset + 4 > view.byteLength) {
    throw new Error('Malformed binary telemetry data: truncated speed');
  }
  const speed = Number(view.getFloat32(offset, true).toFixed(2));
  offset += 4;

  // 6. Read heading (2 bytes, Uint16)
  if (offset + 2 > view.byteLength) {
    throw new Error('Malformed binary telemetry data: truncated heading');
  }
  const heading = view.getUint16(offset, true);
  offset += 2;

  // 7. Read timestamp (8 bytes, Float64 / Double)
  if (offset + 8 > view.byteLength) {
    throw new Error('Malformed binary telemetry data: truncated timestamp');
  }
  const timeMs = view.getFloat64(offset, true);
  const timestamp = new Date(timeMs).toISOString();

  return {
    vehicleId,
    latitude,
    longitude,
    speed,
    heading,
    timestamp,
  };
}
