# SQA Assignment – Legal Assistance Platform

## Overview
This repository contains the code deliverables for the Acme AI QA Engineer assignment for a legal assistance platform with a React-based frontend and FastAPI backend.

The scope includes:
- Frontend automated testing
- Backend integration and security testing
- Load testing for `/generate`

## Test Organization

### Frontend Unit Tests
Frontend unit tests are co-located with the components or modules they validate.

Examples:
- `src/components/common/ErrorMessage.spec.tsx`
- `src/components/.../*.spec.tsx`

### Frontend Integration Tests
Integration tests are stored under:
- `frontend/tests/integration/`

These cover flows such as:
- Query submission
- Response rendering

### Frontend Snapshot Tests
Snapshot tests are stored under:
- `frontend/tests/snapshot/`

These help detect unintended UI layout changes.

### Backend Tests
Backend API and security tests are stored under:
- `backend/tests/`

These cover:
- `/generate` success and failure behavior
- Invalid input handling
- Security-oriented test cases

### Load Tests
Load tests are stored under:
- `load/`

These include k6 scripts for concurrent user simulation against `/generate`.

## Tools Used
- Vitest
- React Testing Library
- Playwright Component Testing / E2E
- Pytest
- FastAPI TestClient
- k6

## Setup

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Playwright Browser Setup
```bash
cd frontend
npx playwright install
```

## Running Tests

### Frontend Unit and Component Tests
These include co-located `*.spec.tsx` files inside `src/`.

```bash
cd frontend
npm run test
```

### Frontend Integration Tests
```bash
cd frontend
npx vitest run tests/integration
```

### Frontend Snapshot Tests
```bash
cd frontend
npm run test:snapshot
```

### Frontend End-to-End / Component Tests
```bash
cd frontend
npm run test:e2e
```

### Backend Integration and Security Tests
```bash
cd backend
pytest -v
```

Run only `/generate` integration tests:

```bash
cd backend
pytest -v tests/test_generate_integration.py
```

Run only security tests:

```bash
cd backend
pytest -v tests/test_security.py
```

### Load Testing
Run against a custom backend URL:

```bash
k6 run -e BASE_URL=http://localhost:8000 load/k6-generate.js
```

