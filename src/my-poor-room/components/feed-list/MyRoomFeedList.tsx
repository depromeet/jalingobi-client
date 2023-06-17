import { Fragment, useEffect, useRef } from 'react';

import { DateChip } from '@/my-poor-room/components/chip';
import { Spacing } from '@/shared/components';

import { MyFeed } from '../feed/MyFeed';

type IMyFeed = {
  recordInfo: {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    price: number;
    date: string;
  };
  challengeInfo: {
    imgUrl: string;
    title: string;
  };
  emojiInfo: {
    selectedEmoji: string | null;
    crazy: number;
    regretful: number;
    wellDone: number;
    comment: number;
  };
};

// MOCK
const myFeedList: IMyFeed[] = [
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

export default function MyRoomFeedList() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const isFeedDateDifferent = ({
    currentFeed,
    nextFeed,
  }: {
    currentFeed: IMyFeed;
    nextFeed: IMyFeed;
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

  useEffect(() => {
    if (!bottomRef.current) {
      return;
    }
    bottomRef.current.scrollIntoView();
  }, [bottomRef.current]);

  return (
    <div className="-z-10 overflow-y-auto bg-gray-10 px-5">
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {myFeedList.map(({ recordInfo, challengeInfo, emojiInfo }, index) => {
          const currentFeed = myFeedList[index];
          const nextFeed = myFeedList[index + 1];
          const isDateDifferent = isFeedDateDifferent({
            currentFeed,
            nextFeed,
          });
          return (
            <Fragment key={recordInfo.id}>
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
              {isDateDifferent ? (
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
}
