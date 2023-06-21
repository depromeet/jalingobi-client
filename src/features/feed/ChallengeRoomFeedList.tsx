import { Fragment } from 'react';

import { DateChip } from '@/pages/my-poor-room/DateChip';
import { Spacing } from '@/shared/components';
import { useScrollToBottom } from '@/shared/hooks';
import { isFeedDateDifferent } from '@/shared/utils/date';
import { TChallengeFeed } from '@/types/feed';

import { MyFeed } from './MyFeed';
import { OthersFeed } from './OthersFeed';

// MOCK
const challengeFeedList: TChallengeFeed[] = [
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
];

export const ChallengeRoomFeedList = () => {
  const { bottomRef } = useScrollToBottom();

  return (
    <div className="-z-10 bg-gray-10 px-5">
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {challengeFeedList.map(
          ({ isMine, userInfo, recordInfo, emojiInfo }, index) => {
            // TODO: 서버 데이터랑 네이밍 통일
            return (
              <Fragment key={recordInfo.id}>
                {isMine ? (
                  <MyFeed
                    recordId={recordInfo.id}
                    recordImgUrl={recordInfo.imgUrl}
                    title={recordInfo.title}
                    price={recordInfo.price}
                    content={recordInfo.content}
                    recordDate={recordInfo.date}
                    onClickFeed={(id) => console.log(`Feed Id: ${id}`)}
                  />
                ) : (
                  <OthersFeed
                    recordId={recordInfo.id}
                    recordImgUrl={recordInfo.imgUrl}
                    title={recordInfo.title}
                    price={recordInfo.price}
                    content={recordInfo.content}
                    recordDate={recordInfo.date}
                    profileImgUrl={userInfo.imgUrl}
                    nickname={userInfo.nickname}
                    currentCharge={userInfo.currentCharge}
                    onClickFeed={(id) => console.log(`Feed Id: ${id}`)}
                  />
                )}
                {isFeedDateDifferent({
                  currentFeed: challengeFeedList[index],
                  nextFeed: challengeFeedList[index + 1],
                }) ? (
                  <DateChip date={recordInfo.date} />
                ) : (
                  <Spacing height={32} />
                )}
              </Fragment>
            );
          },
        )}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};
