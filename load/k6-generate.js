import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

export const latency = new Trend('generate_latency');
export const errorRate = new Rate('generate_errors');

export const options = {
  scenarios: {
    generate_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 50 },
        { duration: '40s', target: 100 },
        { duration: '20s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<1500'],
    generate_errors: ['rate<0.02'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';

export default function () {
  const payload = JSON.stringify({
    query: 'Data Protection & Privacy Act',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(`${BASE_URL}/generate`, payload, params);

  const ok = check(res, {
    'status is 200': (r) => r.status === 200,
    'response has body': (r) => !!r.body,
  });

  errorRate.add(!ok);
  latency.add(res.timings.duration);

  sleep(1);
}