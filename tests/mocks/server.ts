import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Setup MSW server for Node.js environment (used in Vitest)
export const server = setupServer(...handlers)
