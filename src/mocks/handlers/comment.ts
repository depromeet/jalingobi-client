import { rest } from 'msw';

export const commentHandlers = [
  rest.post(`/record/:recordId/comment`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        code: 0,
        message: '요청에 성공하였습니다.',
        result: {
          id: 1,
          commenterId: 1,
          imgUrl: '/test.jpg',
          nickname: '자린고비',
          content: '안녕',
          commentDate: '2023-07-15T07:49:57.259Z',
        },
      }),
    );
  }),
  rest.delete(`/record/:recordId/comment/:commentId`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        code: 200,
        message: '요청에 성공하였습니다.',
      }),
    );
  }),
];
