import {
  AddCommentRequest,
  AddCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResult,
} from '@/shared/types/comment';

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

export const deleteComment = async ({
  recordId,
  commentId,
}: DeleteCommentRequest): Promise<DeleteCommentResult> => {
  const response = await httpClient.delete(
    `/record/${recordId}/comment/${commentId}`,
  );

  return response.data;
};
