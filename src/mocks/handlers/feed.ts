import { rest } from 'msw';

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
          current: offset === '1' ? 20 : 10,
          myFeedList:
            offset === '1' ? myRoomFeed.slice(0, 20) : myRoomFeed.slice(20, 30),
        },
      }),
    );
  }),
  rest.get(
    '/challenge/:challengeId/feed?offsetRecordId=:offsetRecordId',
    (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          isSuccess: true,
          code: 200,
          message: '요청에 성공하였습니다.',
          result: {
            total: 120,
            limit: 20,
            current: 15,
            lastRecordId: 38,
            challengeFeedList: [
              {
                isMine: true,
                userInfo: {
                  imgUrl: '/images/profile.png',
                  nickname: '사용자 닉네임',
                  currentCharge: 78000,
                },
                recordInfo: {
                  id: 27,
                  imgUrl: '/images/떡볶이.jpg',
                  title: '기록 타이틀',
                  content: '기록 내용',
                  price: 5000,
                  date: '2023-06-19T15:34:50.756',
                },
                emojiInfo: {
                  selectedEmoji: null,
                  crazy: 2,
                  regretful: 0,
                  wellDone: 3,
                  comment: 5,
                },
              },
              {
                isMine: false,
                userInfo: {
                  imgUrl: '/images/profile.png',
                  nickname: '사용자 닉네임',
                  currentCharge: 78000,
                },
                recordInfo: {
                  id: 28,
                  imgUrl: '/images/떡볶이.jpg',
                  title: '기록 타이틀',
                  content: '기록 내용',
                  price: 5000,
                  date: '2023-06-18T15:34:50.756',
                },
                emojiInfo: {
                  selectedEmoji: null,
                  crazy: 2,
                  regretful: 0,
                  wellDone: 3,
                  comment: 5,
                },
              },
              {
                isMine: false,
                userInfo: {
                  imgUrl: '/images/profile.png',
                  nickname: '사용자 닉네임',
                  currentCharge: 78000,
                },
                recordInfo: {
                  id: 29,
                  imgUrl: '/images/떡볶이.jpg',
                  title: '기록 타이틀',
                  content: '기록 내용',
                  price: 5000,
                  date: '2023-06-17T15:34:50.756',
                },
                emojiInfo: {
                  selectedEmoji: null,
                  crazy: 2,
                  regretful: 0,
                  wellDone: 3,
                  comment: 5,
                },
              },
              {
                isMine: true,
                userInfo: {
                  imgUrl: '/images/profile.png',
                  nickname: '사용자 닉네임',
                  currentCharge: 78000,
                },
                recordInfo: {
                  id: 30,
                  imgUrl: '/images/떡볶이.jpg',
                  title: '기록 타이틀',
                  content: '기록 내용',
                  price: 5000,
                  date: '2023-06-16T15:34:50.756',
                },
                emojiInfo: {
                  selectedEmoji: null,
                  crazy: 2,
                  regretful: 0,
                  wellDone: 3,
                  comment: 5,
                },
              },
              {
                isMine: false,
                userInfo: {
                  imgUrl: '/images/profile.png',
                  nickname: '사용자 닉네임',
                  currentCharge: 78000,
                },
                recordInfo: {
                  id: 31,
                  imgUrl: '/images/떡볶이.jpg',
                  title: '기록 타이틀',
                  content: '기록 내용',
                  price: 5000,
                  date: '2023-06-15T15:34:50.756',
                },
                emojiInfo: {
                  selectedEmoji: null,
                  crazy: 2,
                  regretful: 0,
                  wellDone: 3,
                  comment: 5,
                },
              },
              {
                isMine: false,
                userInfo: {
                  imgUrl: '/images/profile.png',
                  nickname: '사용자 닉네임',
                  currentCharge: 78000,
                },
                recordInfo: {
                  id: 32,
                  imgUrl: '/images/떡볶이.jpg',
                  title: '기록 타이틀',
                  content: '기록 내용',
                  price: 5000,
                  date: '2023-06-15T15:34:50.756',
                },
                emojiInfo: {
                  selectedEmoji: null,
                  crazy: 2,
                  regretful: 0,
                  wellDone: 3,
                  comment: 5,
                },
              },
            ],
          },
        }),
      );
    },
  ),
];
