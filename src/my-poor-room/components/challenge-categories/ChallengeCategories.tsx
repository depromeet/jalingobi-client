import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { CHALLENGE_ID_MY_ROOM } from '@/my-poor-room/constants';
import { IconTile } from '@/public/svgs';

interface ICategory {
  challengeId: number;
  imgUrl: string;
  title: string;
}

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

export default function ChallengeCategories() {
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
    <div className="relative flex h-[5.375rem] items-center ">
      <div className="absolute right-0 flex h-full w-[4.375rem] flex-col items-center justify-center gap-1">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-20"
          onClick={handleClickIcon}
        >
          <IconTile />
        </div>
        <p className="font-caption-medium-md text-gray-60">전체보기</p>
      </div>
      <div className="scrollbar-hide flex w-[calc(100vw-4.375rem)] overflow-auto">
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
    </div>
  );
}

interface ChallengeCategoryProps {
  challengeId: number;
  imgUrl: string;
  title: string;
  selected: boolean;
  onClick: (challengeId: number) => void;
}

function ChallengeCategory({
  challengeId,
  imgUrl,
  title,
  selected,
  onClick,
}: ChallengeCategoryProps) {
  return (
    <div
      className="flex flex-col items-center gap-1 px-2"
      onClick={() => onClick(challengeId)}
    >
      <div
        className={clsx(
          'relative h-10 w-10 overflow-hidden rounded-lg object-cover',
          selected &&
            'border-2 border-solid border-primary  shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
        )}
      >
        <Image src={imgUrl} alt="" fill sizes="(max-width: 600px) 10vw" />
      </div>
      <p
        className={clsx(
          'font-caption-medium-md w-12 truncate text-center',
          !selected && 'text-gray-50',
        )}
      >
        {title}
      </p>
    </div>
  );
}
