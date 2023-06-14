import { rest } from 'msw';

export const userHandlers = [
  rest.get('/api/mypage', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        code: 1000,
        message: '요청에 성공하였습니다.',
        result: {
          profile: {
            name: '박정윤',
            email: 'email@gmail.com',
            imgUrl: '/images/profile.png',
          },
          notification: false,
          userChallengeResult: {
            PROCEEDING: 1,
            SUCCESS: 0,
            COMPLETED: 0,
          },
        },
      }),
    );
  }),
];
