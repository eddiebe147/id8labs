# Middleware Integration Tests

## Overview

This directory contains comprehensive integration tests for the Next.js middleware authentication and authorization logic.

## Test File

- **auth.integration.test.ts** - Complete test suite for middleware authentication flows

## Test Coverage

The test suite covers **39 test cases** across the following scenarios:

### 1. Protected Routes (`/courses/*`)
- Redirects unauthenticated users to `/sign-in` with redirect parameter
- Allows authenticated users to access protected course content
- Tests nested course paths (modules, lessons, etc.)

### 2. Free Paths (module-0 Access)
- Allows unauthenticated access to free module-0 content
- Supports both authenticated and unauthenticated users
- Tests nested paths within free modules

### 3. Auth Pages Redirection
- Redirects authenticated users from `/sign-in` and `/sign-up` to courses
- Allows unauthenticated users to access auth pages

### 4. Unprotected Routes
Tests that the following routes work without authentication:
- `/` (home)
- `/products`
- `/essays` and essay pages
- `/about`, `/contact`, `/pricing`

### 5. Redirect Parameter Preservation
- Preserves original path in redirect parameter
- Handles query parameters correctly
- URL encodes special characters

### 6. Supabase Client Initialization
- Verifies correct Supabase client configuration
- Tests session refresh via `auth.getUser()`
- Validates cookie handling setup

### 7. Cookie Handling
- Tests cookie reading from requests
- Verifies cookie handlers are invoked

### 8. Edge Cases
- Handles null/undefined user responses
- Tests minimal user objects
- Validates deeply nested paths
- Ensures non-course paths with "courses" in name aren't protected

### 9. Integration with Supabase SSR
- Session refresh for expired tokens
- Graceful error handling for Supabase failures

## Running the Tests

```bash
# Run all tests
npm test

# Run only middleware tests
npm test -- tests/middleware/auth.integration.test.ts

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Test Architecture

### Mocking Strategy

1. **Supabase SSR Mock**: The `@supabase/ssr` module is mocked to avoid real API calls
2. **NextRequest Mock**: Custom helper creates mock Next.js request objects
3. **User Simulation**: Tests simulate both authenticated and unauthenticated states

### Helper Functions

- `createMockRequest(url, cookies)` - Creates mock NextRequest with URL and cookies
- `createMockSupabaseClient(user)` - Creates mock Supabase client with auth state
- `setupSupabaseMock(user)` - Configures the Supabase mock for test scenarios

## Key Test Patterns

### Testing Protected Routes
```typescript
await setupSupabaseMock(null) // No user
const request = createMockRequest('http://localhost:3000/courses/...')
const response = await middleware(request)
expect(response.status).toBe(307) // Redirect
```

### Testing Authenticated Access
```typescript
const mockUser = { id: 'test-user-id', email: 'test@example.com' }
await setupSupabaseMock(mockUser)
const request = createMockRequest('http://localhost:3000/courses/...')
const response = await middleware(request)
expect(response.status).toBe(200) // Allow
```

## Assertions

The tests verify:
- HTTP status codes (200 for allowed, 307 for redirects)
- Redirect URLs and location headers
- Redirect parameter encoding
- Supabase client initialization and configuration
- Cookie handler invocation

## Middleware Logic Reference

The middleware implements these rules:

1. **Protected paths**: `/courses` (all course content)
2. **Free paths**: `/courses/*/module-0` (free preview module)
3. **Auth paths**: `/sign-in`, `/sign-up` (redirect if authenticated)
4. **Redirect flow**: Unauthenticated → `/sign-in?redirect={original_path}`

## Coverage

Current test coverage for middleware: **100%**

All branches, functions, and lines are covered by the integration tests.

## Maintenance

When updating middleware logic:

1. Update corresponding tests in `auth.integration.test.ts`
2. Add new test cases for new protected/free paths
3. Verify all tests pass: `npm test`
4. Update this README if logic changes significantly

## Environment Setup

The tests use the test environment configured in:
- `vitest.config.ts` - Vitest configuration
- `tests/setup.ts` - Global test setup and environment variables

Environment variables are mocked in `setup.ts`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
