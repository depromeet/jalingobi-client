import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment, deleteComment } from '@/service/comment';

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addComment'] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deleteComment'] });
    },
  });
};
