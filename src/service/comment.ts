import { AddCommentRequest, AddCommentResponse } from '@/shared/types/comment';

import { httpClient } from '.';

export const addComment = async ({
  content,
  recordId,
}: AddCommentRequest): Promise<AddCommentResponse> => {
  const response = await httpClient.post(`/record/${recordId}/comment`, {
    content,
  });

  return response.data;
};
