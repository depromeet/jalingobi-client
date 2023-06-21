import { Fragment } from 'react';

import { DateChip } from '@/pages/my-poor-room/DateChip';
import { Spacing } from '@/shared/components';
import { useScrollToBottom } from '@/shared/hooks';
import { isFeedDateDifferent } from '@/shared/utils/date';
import { TMyFeed } from '@/types/feed';

import { MyFeed } from './MyFeed';

// MOCK
const myFeedList: TMyFeed[] = [
  {
    recordInfo: {
      id: 27,
      imgUrl: '/images/떡볶이.jpg',
      title: '기록 타이틀27',
      content: '기록 내용',
      price: 5000,
      date: '2023-06-19T15:38:18.812',
    },
    challengeInfo: {
      imgUrl: '/images/profile.png',
      title: '챌린지 타이틀',
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
    recordInfo: {
      id: 28,
      imgUrl: '/images/떡볶이.jpg',
      title: '기록 타이틀28',
      content: '기록 내용',
      price: 5000,
      date: '2023-06-18T15:38:18.812',
    },
    challengeInfo: {
      imgUrl: '/images/profile.png',
      title: '챌린지 타이틀',
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
    recordInfo: {
      id: 29,
      imgUrl: '/images/떡볶이.jpg',
      title: '기록 타이틀',
      content: '기록 내용',
      price: 5000,
      date: '2023-06-17T15:38:18.812',
    },
    challengeInfo: {
      imgUrl: '/images/profile.png',
      title: '챌린지 타이틀',
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
    recordInfo: {
      id: 30,
      imgUrl: '/images/떡볶이.jpg',
      title: '기록 타이틀',
      content: '기록 내용',
      price: 5000,
      date: '2023-06-16T15:38:18.812',
    },
    challengeInfo: {
      imgUrl: '/images/profile.png',
      title: '챌린지 타이틀',
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
    recordInfo: {
      id: 31,
      imgUrl: '/images/떡볶이.jpg',
      title: '기록 타이틀',
      content: '기록 내용',
      price: 5000,
      date: '2023-06-15T15:38:18.812',
    },
    challengeInfo: {
      imgUrl: '/images/profile.png',
      title: '챌린지 타이틀',
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
    recordInfo: {
      id: 32,
      imgUrl: '/images/떡볶이.jpg',
      title: '기록 타이틀',
      content: '기록 내용',
      price: 5000,
      date: '2023-06-15T15:38:18.812',
    },
    challengeInfo: {
      imgUrl: '/images/profile.png',
      title: '챌린지 타이틀',
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

export const MyRoomFeedList = () => {
  const { bottomRef } = useScrollToBottom();

  return (
    <div className="-z-10 overflow-y-auto bg-gray-10 px-5">
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {myFeedList.map(({ recordInfo, challengeInfo, emojiInfo }, index) => {
          return (
            <Fragment key={recordInfo.id}>
              {/* TODO: 서버 데이터랑 네이밍 통일 */}
              <MyFeed
                recordId={recordInfo.id}
                recordImgUrl={recordInfo.imgUrl}
                title={recordInfo.title}
                price={recordInfo.price}
                content={recordInfo.content}
                recordDate={recordInfo.date}
                challengeImgUrl={challengeInfo.imgUrl}
                challengeTitle={challengeInfo.title}
                onClickFeed={(id) => console.log(`Feed Id: ${id}`)}
              />
              {isFeedDateDifferent({
                currentFeed: myFeedList[index],
                nextFeed: myFeedList[index + 1],
              }) ? (
                <DateChip date={recordInfo.date} />
              ) : (
                <Spacing height={32} />
              )}
            </Fragment>
          );
        })}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};
