import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment } from '@/service/comment';

// TODO: key값 넣기
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addComment'] });
    },
  });
};
