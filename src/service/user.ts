import { httpClient } from '@/service/index';
import { ApiResponse } from '@/types/api';
import { UserResponse, UserUpdateRequest } from '@/types/user';

export const fetchUserProfile = async (): Promise<UserResponse> => {
  const response = await httpClient.get('/mypage');
  return response.data;
};

export const updateUserProfile = async (
  user: UserUpdateRequest,
): Promise<ApiResponse> => {
  return httpClient.patch('/mypage/profile', user);
};
