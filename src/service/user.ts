import { UserResponse } from '@/types/user';

export const fetchUserProfile = async (): Promise<UserResponse> => {
  const response = await fetch('/api/mypage');
  return response.json();
};
