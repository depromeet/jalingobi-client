import { Fragment, useEffect, useRef, useState } from 'react';

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
  const feedRef = useRef<HTMLDivElement>(null);

  const [feedHeight, setFeedHeight] = useState<number>(0);

  const isDateChipVisible = ({
    challengeFeedList,
    index,
  }: {
    challengeFeedList: IChallengeFeed[];
    index: number;
  }) => {
    const isLast = index === challengeFeedList.length - 1;

    let nextRecordDate = null;

    // 마지막 요소가 아닌 경우 이전 recordDate 값을 설정
    if (!isLast) {
      nextRecordDate = challengeFeedList[index + 1].recordInfo.date;
    }

    // 현재 요소의 recordDate와 다음 recordDate 비교
    const isSameDate =
      challengeFeedList[index].recordInfo.date === nextRecordDate;

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
        <Spacing height={32} />
        {challengeFeedList.map(
          ({ isMine, userInfo, recordInfo, emojiInfo }, index) => {
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
                {isDateChipVisible({ challengeFeedList, index }) ? (
                  <DateChip date={recordInfo.date} />
                ) : (
                  <Spacing height={32} />
                )}
              </Fragment>
            );
          },
        )}
      </ul>
    </div>
  );
}
