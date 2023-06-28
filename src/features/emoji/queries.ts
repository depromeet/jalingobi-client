import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuid4 } from 'uuid';

import { deleteEmoji, updateEmoji } from '@/service/emoji';

export const useUpdateEmoji = () => {
  const id = uuid4();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmoji,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useUpdateEmoji', id] });
    },
  });
};

export const useDeleteEmoji = () => {
  const id = uuid4();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmoji,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['juseDeleteEmoji', id] });
    },
  });
};
