import { userHandlers } from '@/mocks/handlers/user';

import { challengeHandlers } from './challenge';

export const handlers = [...userHandlers, ...challengeHandlers];
