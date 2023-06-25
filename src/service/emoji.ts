import { ApiResponse } from '@/types/api';
import { EmojiRequest } from '@/types/emoji';

import { httpClient } from '.';

export const updateEmoji = async ({
  recordId,
  type,
}: EmojiRequest): Promise<ApiResponse> => {
  const response = await httpClient.patch(`record/${recordId}/emoji`, {
    type,
  });

  return response.data;
};

export const deleteEmoji = async ({
  recordId,
  type,
}: EmojiRequest): Promise<ApiResponse> => {
  const response = await httpClient.delete(`record/${recordId}/emoji`, {
    data: { type },
  });

  return response.data;
};
