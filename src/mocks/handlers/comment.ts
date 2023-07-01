import { rest } from 'msw';

export const commentHandlers = [
  rest.post(`/record/:recordId/comment`, (req, res, ctx) => {
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
