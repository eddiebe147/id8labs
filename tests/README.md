# ID8Labs Test Suite

## Overview

This test suite provides comprehensive integration and unit testing for the ID8Labs Next.js application.

## Test Files Created

### Integration Tests

1. **tests/api/checkout.integration.test.ts** - Stripe checkout API tests
   - Authentication validation
   - Product validation  
   - Duplicate purchase prevention
   - Checkout session creation
   - Error handling

2. **tests/api/webhook.integration.test.ts** - Stripe webhook handler tests
   - Signature verification
   - checkout.session.completed events
   - checkout.session.expired events
   - charge.refunded events
   - Unknown event handling

3. **tests/api/leads.integration.test.ts** - Lead capture API tests
   - Readiness assessment leads
   - Waitlist leads
   - Email validation
   - Resend API integration

### Unit Tests

4. **tests/lib/purchase.test.ts** - Purchase utility tests
   - isPaidModule() validation
   - PAID_MODULES constants
   - FREE_MODULES constants
   - Module integrity checks

5. **tests/lib/stripe.test.ts** - Stripe configuration tests
   - getStripe() initialization
   - COURSE_PRODUCTS configuration
   - Product validation
   - Type safety

6. **tests/hooks/useAnnotations.test.ts** - Annotations hook tests (26 tests)
   - Initial fetch behavior (authenticated/unauthenticated)
   - Highlight CRUD operations
   - Note CRUD operations
   - Stats updates
   - Module filtering
   - Error handling

### API Integration Tests

7. **tests/api/annotations.integration.test.ts** - Annotations API tests (18 tests)
   - POST /api/annotations/highlights
   - POST /api/annotations/notes
   - Authentication validation
   - Input validation
   - Database error handling

### End-to-End Tests

8. **e2e/annotations.spec.ts** - Annotations UI tests (18 tests, ready when UI implemented)
   - Notes sidebar interactions
   - Tab navigation (Highlights, Notes, AI)
   - Unauthenticated user experience
   - Accessibility
   - Mobile responsiveness

## Test Structure

All tests follow these patterns:

- **Arrange-Act-Assert** pattern for clarity
- **Descriptive test names** that explain what is being tested
- **Independent tests** that don't depend on execution order
- **Proper mocking** using MSW (Mock Service Worker) for HTTP requests
- **Type safety** with TypeScript

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/api/checkout.integration.test.ts

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Current Test Status

### Passing Tests
- All lib/stripe tests (25/25)
- All lib/purchase tests (22/22)
- Most API leads tests (17/18)
- **All annotations hook tests (26/26)** ✅
- **All annotations API tests (18/18)** ✅
- E2E annotations tests (18 tests, skipped until UI implemented)  

### Known Issues

#### Authentication Mocking
The checkout and webhook integration tests require complex Supabase SSR mocking that isn't fully implemented in the test environment. These tests are structurally correct but need additional setup:

1. **Supabase Server Client Mocking** - The `createClient()` function from `@/lib/supabase/server` needs to be mocked to return authenticated users
2. **Next.js Headers Mocking** - The `headers()` function is mocked but needs per-test customization
3. **Request Context** - Next.js App Router requires proper request context for server-side functions

#### Recommendations

For full integration testing of authenticated routes:

1. **E2E Tests**: Use Playwright for full end-to-end testing with real authentication
2. **Test Database**: Set up a test Supabase project for integration tests
3. **Mock Factories**: Create test helper functions to generate mock Supabase clients

## Test Coverage Goals

- **Statements**: 70%
- **Branches**: 60%
- **Functions**: 70%
- **Lines**: 70%

## MSW Handlers

Mock API responses are defined in `tests/mocks/handlers.ts`:

- Stripe API endpoints
- Supabase Auth endpoints
- Supabase Database endpoints
- Resend Email API endpoints

## Environment Variables

Test environment variables are stubbed in `tests/setup.ts`:

```typescript
NEXT_PUBLIC_SUPABASE_URL=https://test.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=test-anon-key
STRIPE_SECRET_KEY=sk_test_mock
STRIPE_WEBHOOK_SECRET=whsec_test_mock
RESEND_API_KEY=re_test_mock
RESEND_AUDIENCE_ID=aud_test_mock
```

## Best Practices

1. **Test Isolation**: Each test should be independent and not rely on shared state
2. **Clear Descriptions**: Test names should clearly describe what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and assertion phases
4. **Mock External Dependencies**: Use MSW to mock HTTP requests instead of hitting real APIs
5. **Type Safety**: Leverage TypeScript for type-safe tests

## Future Improvements

1. Add E2E tests with Playwright for critical user flows
2. Implement visual regression testing
3. Add performance/load testing for API endpoints
4. Set up CI/CD pipeline for automated testing
5. Implement contract testing for API routes
6. Add accessibility testing

## Contributing

When adding new tests:

1. Follow the existing test structure and patterns
2. Add tests in the appropriate directory (`api/` for integration, `lib/` for unit)
3. Update this README if adding new test categories
4. Ensure tests are independent and don't leave side effects
5. Use descriptive test names that explain the behavior being tested

## Test Framework

- **Test Runner**: Vitest
- **Assertions**: Vitest expect API
- **Mocking**: MSW (Mock Service Worker)
- **Environment**: happy-dom (lightweight DOM implementation)

## Documentation

For more information on testing patterns and frameworks:

- [Vitest Documentation](https://vitest.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Library](https://testing-library.com/)
