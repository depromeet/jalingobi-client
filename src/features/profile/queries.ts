import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchUserProfile,
  getUserInfo,
  updateUserProfile,
} from '@/service/user';

const userKeys = {
  all: ['user'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// TODO: 로그인 구현 시, 로그인 유저 id를 활용하여 key 관리
export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: fetchUserProfile,
  });
};

// TODO: 로그인 구현 시, 로그인 유저 id를 invalidate 시키도록 수정
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.all);
    },
  });
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserInfo,
  });
};
