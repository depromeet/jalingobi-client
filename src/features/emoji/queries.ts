import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuid4 } from 'uuid';

import { deleteEmoji, updateEmoji } from '@/service/emoji';

// TODO: 민정님에게 selected되지 않은 이모지 update시에 selected되어있던 이모지는 알아서 count down되는지 여쭤보기
// TODO: 요청에 대한 키값이 넘어오면 key값 수정하기
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
