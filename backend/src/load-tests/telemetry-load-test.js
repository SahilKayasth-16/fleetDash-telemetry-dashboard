import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    stages: [
        {duration: "30s", target: 50 },
        {duration: "30s", target: 200 },
        {duration: "30s", target: 500 },
        {duration: "30s", target: 1000 },
        {duration: "30s", target: 2000 },
        {duration: "1m", target: 2000 },
        {duration: "30s", target: 0 }
    ],
    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<500"]
    }
};

const BASE_URL = "http://localhost:5050";

export default function() {
    const vehicleId = `VH-${Math.floor(Math.random() * 5000)}`;

    const payload = JSON.stringify({
        vehicleId,
        latitude: 21 + Math.random(),
        longitude: 73 + Math.random(),
        speed: Math.floor(Math.random() * 120),
        heading: Math.floor(Math.random() * 360),
        timestamp: new Date().toISOString(),
    });

    const params = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const res = http.post(`${BASE_URL}/api/telemetry`, payload, params);

    check(res, { "Status is 201": (r) => r.status === 201 });

    sleep(0.1);
}