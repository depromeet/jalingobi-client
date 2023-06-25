import { httpClient } from '@/service/index';
import { ApiResponse } from '@/shared/types/api';
import {
  UserChallengeListResult,
  UserResponse,
  UserUpdateRequest,
} from '@/shared/types/user';

export const fetchUserProfile = async (): Promise<UserResponse> => {
  const response = await httpClient.get('/mypage');
  return response.data;
};

export const updateUserProfile = async (
  user: UserUpdateRequest,
): Promise<ApiResponse> => {
  return httpClient.patch('/mypage/profile', user);
};

export const fetchUserChallengeList =
  async (): Promise<UserChallengeListResult> => {
    const response = await httpClient.get('/mypage/challenges');
    return response.data;
  };
