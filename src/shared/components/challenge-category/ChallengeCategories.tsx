import { useRouter } from 'next/router';

import { shallow } from 'zustand/shallow';

import { useChallengeList } from '@/features/feed/queries';
import { IconTile } from '@/public/svgs';
import { useRoom } from '@/shared/store/room';

import { ComponentLoading } from '../loading/ComponentLoading';

import { ChallengeCategory } from './ChallengeCategory';

export const ChallengeCategories = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useChallengeList();

  const [selectedChallengeId, setChallengeId] = useRoom(
    (state) => [state.challengeId, state.setChallengeId],
    shallow,
  );

  const handleClickCategory = (challengeId: number) => {
    setChallengeId(challengeId);
  };

  // TODO: 라우팅 필요
  const handleClickIcon = () => console.log('아이콘 클릭');

  // TODO: react-error-boundary, suspense 도입하기
  if (isLoading) {
    return <ComponentLoading />;
  }

  if (isError) {
    router.push('/not-found');
    return null;
  }

  return (
    <div className="relative flex h-[5.375rem] items-center justify-between">
      <div className="scrollbar-hide flex overflow-auto">
        {data.result.participatedChallengeList.map(
          ({ challengeId, imgUrl, title }) => {
            return (
              <ChallengeCategory
                key={challengeId}
                challengeId={challengeId}
                imgUrl={imgUrl}
                title={title}
                selected={challengeId === selectedChallengeId}
                onClick={handleClickCategory}
              />
            );
          },
        )}
      </div>
      <div className="flex w-[5rem] shrink-0 flex-col items-center justify-center gap-1">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-20"
          onClick={handleClickIcon}
        >
          <IconTile />
        </button>
        <p className="font-caption-medium-md text-gray-60">전체보기</p>
      </div>
    </div>
  );
};
