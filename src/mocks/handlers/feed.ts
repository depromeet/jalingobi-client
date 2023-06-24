import { rest } from 'msw';

import challengeFeed from '../challengeFeed.json';
import myRoomFeed from '../myRoomFeed.json';

// QUESTION: 창완님 ! createUrl을 사용하는 이유가 무엇인가요 ??
export const feedHandlers = [
  rest.get(`/challenge/my-list`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        code: 200,
        message: '요청에 성공하였습니다.',
        result: [
          {
            challengeId: 0,
            title: '내 방',
            imgUrl: '/images/떡볶이.jpg',
          },
          {
            challengeId: 1,
            title: 'room1',
            imgUrl: '/images/떡볶이.jpg',
          },
          {
            challengeId: 2,
            title: 'room2',
            imgUrl: '/images/떡볶이.jpg',
          },
          {
            challengeId: 3,
            title: 'room3',
            imgUrl: '/images/떡볶이.jpg',
          },
          {
            challengeId: 4,
            title: 'room4',
            imgUrl: '/images/떡볶이.jpg',
          },
          {
            challengeId: 5,
            title: 'room5',
            imgUrl: '/images/떡볶이.jpg',
          },
        ],
      }),
    );
  }),
  rest.get(`/challenge/:challengeId/proceeding/info`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        code: 200,
        message: '요청에 성공하였습니다.',
        result: {
          goalCharge: 100000,
          currentCharge: 65000,
          percent: 65,
          dueDay: 11,
        },
      }),
    );
  }),
  rest.get('/challenge/my-room/feed?offset=:offset', (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');

    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        code: 200,
        message: '요청에 성공하였습니다.',
        result: {
          total: 30,
          limit: 20,
          current: offset === '0' ? 20 : 10,
          myFeedList:
            offset === '0' ? myRoomFeed.slice(0, 20) : myRoomFeed.slice(20, 30),
        },
      }),
    );
  }),
  rest.get(
    '/challenge/:challengeId/feed?offsetRecordId=:offsetRecordId',
    (req, res, ctx) => {
      const offsetRecordId = req.url.searchParams.get('offsetRecordId');

      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          isSuccess: true,
          code: 200,
          message: '요청에 성공하였습니다.',
          result: {
            total: 30,
            limit: 20,
            current: offsetRecordId === '0' ? 20 : 10,
            lastRecordId: offsetRecordId === '0' ? 20 : 30,
            challengeFeedList:
              offsetRecordId === '0'
                ? challengeFeed.slice(0, 20)
                : challengeFeed.slice(20, 30),
          },
        }),
      );
    },
  ),
];
