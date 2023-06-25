import { AxiosInstance } from 'axios';

import { AuthRefreshResponse } from '@/lib/interfaces';

export const authRefresh = async (
  axiosInstance: AxiosInstance,
): Promise<AuthRefreshResponse> => {
  const response = await axiosInstance.post(
    'https://jalingobi.com/auth/kakao',
    undefined,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};
