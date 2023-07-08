import { useMutation } from '@tanstack/react-query';

import { addSpending } from '@/service/spending';

export const useAddSpendingMutation = () => {
  return useMutation({
    mutationFn: addSpending,
  });
};
