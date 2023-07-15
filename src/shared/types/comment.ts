import { ApiResponse } from './api';

export type AddCommentRequest = {
  content: string;
  recordId: number;
};

export type AddCommentResult = {
  result: {
    commentDate: string;
    commenterId: number;
    content: string;
    id: number;
    imgUrl: string;
    nickname: string;
  };
};

export type AddCommentResponse = AddCommentRequest & AddCommentResult;

export type DeleteCommentRequest = {
  recordId: number;
  commentId: number;
};

export type DeleteCommentResult = ApiResponse<{ commentId: number }>;
