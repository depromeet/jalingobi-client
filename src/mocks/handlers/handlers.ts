import { emojiHandlers } from '@/mocks/handlers/emoji';
import { feedHandlers } from '@/mocks/handlers/feed';
import { userHandlers } from '@/mocks/handlers/user';

export const handlers = [...userHandlers, ...feedHandlers, ...emojiHandlers];
