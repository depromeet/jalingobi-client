import { Fragment, useEffect, useRef } from 'react';

import { Spacing } from '@/shared/components';

import { DateChip } from '../chip';
import { MyFeed } from '../feed/MyFeed';
import { OthersFeed } from '../feed/OthersFeed';

interface IChallengeFeed {
  isMine: boolean;
  userInfo: {
    imgUrl: string;
    nickname: string;
    currentCharge: number;
  };
  recordInfo: {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    price: number;
    date: string;
  };
  emojiInfo: {
    selectedEmoji: string | null;
    crazy: number;
    regretful: number;
    wellDone: number;
    comment: number;
  };
}

// MOCK
const challengeFeedList: IChallengeFeed[] = [
  {
    isMine: true,
    userInfo: {
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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

export default function ChallengeRoomFeedList() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const isFeedDateDifferent = ({
    currentFeed,
    nextFeed,
  }: {
    currentFeed: IChallengeFeed;
    nextFeed: IChallengeFeed;
  }) => {
    if (!nextFeed) return true; // if there is no next feed, show the DateChip

    const currentDate = new Date(currentFeed.recordInfo.date).setHours(
      0,
      0,
      0,
      0,
    );
    const nextDate = new Date(nextFeed.recordInfo.date).setHours(0, 0, 0, 0);

    return currentDate !== nextDate; // return true if the dates are different
  };

  // scroll을 맨 아래로 내리는 로직입니다.
  useEffect(() => {
    if (!bottomRef.current) return;
    bottomRef.current.scrollIntoView();
  }, [bottomRef.current]);

  return (
    <div className="-z-10 overflow-y-auto bg-gray-10 px-5">
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {challengeFeedList.map(
          ({ isMine, userInfo, recordInfo, emojiInfo }, index) => {
            const currentFeed = challengeFeedList[index];
            const nextFeed = challengeFeedList[index + 1];
            const isDateDifferent = isFeedDateDifferent({
              currentFeed,
              nextFeed,
            });
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
                {isDateDifferent ? (
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
}
