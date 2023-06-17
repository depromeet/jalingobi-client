// src/mocks/browser.js
import { setupWorker } from 'msw';

import { handlers } from '@/mocks/handlers/handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
