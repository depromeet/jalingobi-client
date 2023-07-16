import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchChallengeById,
  joinChallenge,
  searchChallengeList,
} from '@/service/challenge';
import { fetchUserChallengeList, leaveChallenge } from '@/service/user';
import { useUserStore } from '@/shared/store/user';
import { ChallengeFilter } from '@/shared/types/challenge';

import { challengeKeys } from './queryKey';

export const useChallengeQuery = (id: number) => {
  return useQuery({
    queryKey: challengeKeys.detail(id),
    queryFn: () => fetchChallengeById(id),
  });
};

export const useJoinChallenge = (id?: number) => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  return useMutation({
    mutationFn: () => joinChallenge(id),
    onSuccess: () => {
      queryClient.invalidateQueries(challengeKeys.list({ userId: user?.id }));
    },
  });
};

export const useLeaveChallenge = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  return useMutation({
    mutationFn: leaveChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries(challengeKeys.list({ userId: user?.id }));
    },
  });
};

export const useChallengeSearch = (filters: ChallengeFilter) => {
  return useQuery({
    queryKey: challengeKeys.list(filters),
    queryFn: () => searchChallengeList(filters),
  });
};

export const useUserChallengeList = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: challengeKeys.list({
      userId: user?.id,
    }),
    queryFn: fetchUserChallengeList,
  });
};
