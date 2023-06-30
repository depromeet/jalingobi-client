import { ChallengeFilter } from '@/shared/types/challenge';

export const challengeKeys = {
  all: ['challenge'] as const,
  lists: () => [...challengeKeys.all, 'list'] as const,
  list: (filters: ChallengeFilter) =>
    [...challengeKeys.lists(), filters] as const,
  details: () => [...challengeKeys.all, 'detail'] as const,
  detail: (id: number) => [...challengeKeys.details(), id] as const,
};
