import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { IconTile } from '@/public/svgs';
import { CHALLENGE_ID_MY_ROOM } from '@/shared/constants';

import { ChallengeCategory } from './ChallengeCategory';

type ICategory = {
  challengeId: number;
  imgUrl: string;
  title: string;
};

// Mock
const categories: ICategory[] = [
  {
    challengeId: CHALLENGE_ID_MY_ROOM,
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
];

export const ChallengeCategories = () => {
  const router = useRouter();

  // TODO: 전역 상태 관리 라이브러리로 전환 필요
  const handleClickCategory = (challengeId: number) => {
    router.replace({
      query: {
        challengeId,
      },
    });
  };

  // TODO: 라우팅 필요
  const handleClickIcon = () => console.log('아이콘 클릭');

  /**
   * TODO: 전역 상태 관리 라이브러리 사용시 로직 변경 필요
   * categories[0]이 내 방이 맞는지 ?
   */
  useEffect(() => {
    router.replace({
      query: {
        challengeId: categories[0].challengeId,
      },
    });
  }, []);

  return (
    <div className="relative flex h-[5.375rem] items-center">
      <div className="scrollbar-hide flex overflow-auto">
        {categories.map(({ challengeId, imgUrl, title }) => {
          return (
            <ChallengeCategory
              key={uuidv4()}
              challengeId={challengeId}
              imgUrl={imgUrl}
              title={title}
              selected={challengeId === Number(router.query.challengeId)}
              onClick={handleClickCategory}
            />
          );
        })}
      </div>
      <div className="flex w-[5rem] shrink-0 flex-col items-center justify-center gap-1">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-20"
          onClick={handleClickIcon}
        >
          <IconTile />
        </div>
        <p className="font-caption-medium-md text-gray-60">전체보기</p>
      </div>
    </div>
  );
};
