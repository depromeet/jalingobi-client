import { AxiosInstance } from 'axios';

import { AuthRefreshResponse } from '@/lib/interfaces';

export const authRefresh = async (
  axiosInstance: AxiosInstance,
): Promise<AuthRefreshResponse> => {
  const response = await axiosInstance.post(
    'https://api.jalingobi.com/auth/refresh',
    undefined,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};
