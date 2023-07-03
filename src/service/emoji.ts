import { ApiResponse } from '@/shared/types/api';
import { EmojiRequest } from '@/shared/types/emoji';

import { httpClient } from '.';

export const updateEmoji = async ({
  recordId,
  type,
}: // eslint-disable-next-line @typescript-eslint/ban-types
EmojiRequest): Promise<ApiResponse<{}>> => {
  const response = await httpClient.patch(`/record/${recordId}/emoji`, {
    type,
  });

  return response.data;
};

export const deleteEmoji = async ({
  recordId,
  type,
}: // eslint-disable-next-line @typescript-eslint/ban-types
EmojiRequest): Promise<ApiResponse<{}>> => {
  const response = await httpClient.delete(`/record/${recordId}/emoji`, {
    data: { type },
  });

  return response.data;
};
