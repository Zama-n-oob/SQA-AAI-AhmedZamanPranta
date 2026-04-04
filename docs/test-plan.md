
---

## 2. `docs/test-plan.md`

```md
# Test Plan

## Objective
The objective of this test effort is to verify the reliability, correctness, security, and basic performance of the legal assistance platform across both frontend and backend layers.

## Scope

### Frontend
The frontend test scope includes:
- Input sanitization
- Form validation
- Response rendering
- Upload/query/response workflow
- UI consistency through snapshot coverage

### Backend
The backend test scope includes:
- `/generate` endpoint functional behavior
- Request/response integration
- Error handling
- Security-related validation such as malicious input handling, header validation, and basic injection/XSS-style payload checks

### Performance
The performance scope includes:
- Load testing of `/generate`
- 50–100 concurrent users
- P95 latency target below 1.5 seconds
- Error rate target below 2%

## Test Approach

### Unit Tests
Used for frontend component-level behavior:
- Input field sanitization
- Form validation
- Conditional rendering
- Loading/error/success states

### Integration Tests
Used for end-to-end feature flow inside the application:
- Document upload flow
- Query submission
- API invocation
- Mock AI response rendering

### Backend API Tests
Used to verify:
- Valid requests to `/generate`
- Invalid payload handling
- Stable response format
- Error handling and resilience

### Security Tests
Used to assess:
- SQL injection-like payload handling
- XSS-style payload handling
- Presence/absence of important security headers
- Rejection or safe handling of malformed input

### Load Tests
Used to assess backend responsiveness under concurrent demand:
- Ramp from low load to 50–100 users
- Measure response latency
- Measure failed requests
- Validate assignment thresholds

## Tools
- Vitest / React Testing Library for frontend unit and component integration tests
- Playwright for browser-level flow validation
- Pytest for backend API and security tests
- k6 for load testing

## Risks / Limitations
- Mock backend responses may differ from production AI behavior
- Security testing here is limited to assignment-relevant abuse cases, not a full penetration test
- Load test results depend on local machine resources and environment stability

## Exit Criteria
Testing is considered sufficient for submission when:
- Critical frontend flows are covered
- `/generate` backend tests pass
- Security test cases execute successfully
- Load results are captured and documented
- README and supporting notes are complete