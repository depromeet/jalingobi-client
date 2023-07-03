import { ApiResponse } from './api';

export type AddCommentRequest = {
  content: string;
  recordId: number;
};

export type AddCommentResult = {
  result: {
    id: number;
    imgUrl: string;
    nickname: string;
    content: string;
    createdAt: string;
  };
};

export type AddCommentResponse = AddCommentRequest & AddCommentResult;

export type DeleteCommentRequest = {
  recordId: number;
  commentId: number;
};

export type DeleteCommentResult = ApiResponse<{
  result: { commentId: number };
}>;
