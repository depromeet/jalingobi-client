import { rest } from 'msw';

import {
  ChallengeResponse,
  ChallengeSearchResponse,
} from '@/shared/types/challenge';

export const challengeHandlers = [
  rest.get('http://localhost:3000/api/challenge/search', (req, res, ctx) => {
    const data: ChallengeSearchResponse = {
      isSuccess: true,
      code: 0,
      message: 'string',
      result: {
        challenges: [
          {
            id: 1,
            title: '배달 10만원 이하로 쓰기 ',
            currentPeopleCount: 3,
            availablePeopleCount: 10,
            imgUrl: '/images/baemin.png',
            price: 1000,
            keywords: ['배달', '10만원'],
            startAt: '2023-06-20',
            createdAt: '2023-06-20',
            period: 30,
            status: 'PROCEEDING',
          },
          {
            id: 2,
            title: '30만원 이내로 사용하기',
            currentPeopleCount: 3,
            availablePeopleCount: 10,
            imgUrl: '/images/baemin.png',
            price: 1000,
            keywords: ['배달', '10만원'],
            startAt: '2023-06-20',
            createdAt: '2023-06-20',
            period: 30,
            status: 'PROCEEDING',
          },
        ],
        hasNext: true,
      },
    };
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get('/api/challenge/:id', (req, res, ctx) => {
    const data: ChallengeResponse = {
      isSuccess: true,
      code: 0,
      message: 'string',
      result: {
        challengeId: 1,
        title: '배달 10만원 이하로 쓰기',
        challengeImgUrl: '/images/baemin.png',
        category: '음식',
        keywords: ['배달', '10만원'],
        headCount: {
          availableCount: 10,
          participants: 3,
        },
        participantsInfo: [
          {
            imgUrl: '/images/baemin.png',
            nickname: '닉네임',
            level: 1,
          },
          {
            imgUrl: '/images/baemin.png',
            nickname: '닉네임',
            level: 1,
          },
          {
            imgUrl: '/images/baemin.png',
            nickname: '닉네임',
            level: 1,
          },
        ],
        rules: ['지출내역을 1회 이상 추가하기', '지출내역을 1회 이상 추가하기'],
        status: 'PROCEEDING',
        dateInfo: {
          period: 30,
          startAt: '2023-06-20',
          endAt: '2023-07-19',
        },
        recruiting: true,
        price: 1000,
      },
    };
    return res(ctx.status(200), ctx.json(data));
  }),
];
