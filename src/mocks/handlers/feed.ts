import { rest } from 'msw';

// QUESTION: 창완님 ! createUrl을 사용하는 이유가 무엇인가요 ??
export const feedHandlers = [
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
