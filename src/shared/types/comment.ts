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
