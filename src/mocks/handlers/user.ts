import { rest } from 'msw';

import {
  GetUserInfoResponse,
  UserChallengeListResult,
  UserResponse,
} from '@/shared/types/user';

export const userHandlers = [
  rest.get('/api/mypage', (req, res, ctx) => {
    const data: UserResponse = {
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        social: {
          id: 'something',
          platform: 'KAKAO',
        },
        profile: {
          nickname: '굴비씌',
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
    };
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.patch('/api/mypage/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        code: 0,
        message: '요청에 성공하였습니다.',
        result: 'SUCCESS',
      }),
    );
  }),

  rest.get('http://localhost:3000/api/mypage/challenges', (req, res, ctx) => {
    const data: UserChallengeListResult = {
      isSuccess: true,
      code: 0,
      message: 'string',
      result: {
        participatedChallenges: [
          {
            challengeId: 1,
            title: '배달 10만원 이하로 쓰기',
            imgUrl: '/images/profile.png',
            active: true,
            duration: {
              period: 30,
              startAt: '2023-06-20',
              endAt: '2023-06-20',
            },
            availableCount: 10,
            status: 'PROCEEDING',
            statusTag: ['마감임박'],
            categories: ['식비', '문화생활'],
            keywords: ['카페인 줄이기', '커피값', '커피'],
            participantCount: 3,
          },
          {
            challengeId: 2,
            title: '30만원 이내로 사용하기',
            imgUrl: '/images/profile.png',
            active: true,
            duration: {
              period: 30,
              startAt: '2023-06-20',
              endAt: '2023-06-20',
            },
            availableCount: 10,
            status: 'SUCCESS',
            statusTag: ['마감임박'],
            categories: ['식비'],
            keywords: ['카페인 줄이기', '커피값', '커피'],
            participantCount: 3,
          },
        ],
      },
    };
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get('/user/info', (req, res, ctx) => {
    const data: GetUserInfoResponse = {
      isSuccess: true,
      code: 200,
      message: '요청에 성공하였습니다.',
      result: {
        id: 0,
        nickname: 'hyunwoo',
        email: 'hyunwoo@naver.com',
        imgUrl: '/images/profile.png',
        platform: 'kakao',
        role: 'user',
        score: 4,
      },
    };
    return res(ctx.status(200), ctx.json(data));
  }),
];
