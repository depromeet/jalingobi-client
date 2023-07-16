import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchUserChallengeList, leaveChallenge } from '@/service/user';

const userChallengeKeys = {
  all: ['userChallenge'] as const,
  lists: () => [...userChallengeKeys.all, 'list'] as const,
  list: (filters: string) =>
    [...userChallengeKeys.lists(), { filters }] as const,
};

export const useUserChallengeList = () => {
  return useQuery({
    queryKey: userChallengeKeys.all,
    queryFn: fetchUserChallengeList,
  });
};

export const useLeaveChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveChallenge,
    onSuccess: () => {
      // TODO: user id에 따라서 query key를 바꿔줘야함
      queryClient.invalidateQueries(userChallengeKeys.list('test'));
    },
  });
};
