import { Spending } from '@/shared/types/spending';

import { httpClient } from '.';

export const addSpending = async (spending: Spending) => {
  return httpClient.post('/spending', spending);
};
