import { Fragment, useEffect, useRef, useState } from 'react';

import { Spacing } from '@/shared/components';

import { DateChip } from '../chip';
import { MyFeed } from '../feed/MyFeed';

interface IMyFeed {
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
}

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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
      imgUrl: '/images/avatar.png',
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
  const feedRef = useRef<HTMLDivElement>(null);

  const [feedHeight, setFeedHeight] = useState<number>(0);

  const isDateChipVisible = ({
    myFeedList,
    index,
  }: {
    myFeedList: IMyFeed[];
    index: number;
  }) => {
    const isLast = index === myFeedList.length - 1;

    let nextRecordDate = null;

    // 마지막 요소가 아닌 경우 이전 recordDate 값을 설정
    if (!isLast) {
      nextRecordDate = myFeedList[index + 1].recordInfo.date;
    }

    // 현재 요소의 recordDate와 다음 recordDate 비교
    const isSameDate = myFeedList[index].recordInfo.date === nextRecordDate;

    if (!isSameDate && !isLast) {
      return true;
    }

    if (isLast) {
      return true;
    }

    return false;
  };

  // TODO: feed height 구하는게 짜쳐보이긴 하는데, sticky가 안먹어서 이렇게 해결해 봤어요. 좋은 해결방법 있으면 같이 해결해봐요 !
  useEffect(() => {
    if (!feedRef.current) {
      return;
    }
    // 60은 bottom-nav의 height 이에요.
    setFeedHeight(
      window.innerHeight - feedRef.current.getBoundingClientRect().top - 60,
    );
  }, []);

  // scroll을 맨 아래로 내리는 로직입니다.
  useEffect(() => {
    if (!feedRef.current) {
      return;
    }

    feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, []);

  return (
    <div
      ref={feedRef}
      style={{ height: `${feedHeight}px` }}
      className="overflow-y-auto bg-gray-10 px-5"
    >
      <ul className="flex flex-col-reverse">
        {myFeedList.map(({ recordInfo, challengeInfo, emojiInfo }, index) => {
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
              {isDateChipVisible({ myFeedList, index }) ? (
                <DateChip date={recordInfo.date} />
              ) : (
                <Spacing height={32} />
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
