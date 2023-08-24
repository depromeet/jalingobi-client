import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { shallow } from 'zustand/shallow';

import { useChallengeList } from '@/features/feed/queries';
import { useRoom } from '@/shared/store/room';

import { ChallengeCategory } from './ChallengeCategory';

export const ChallengeCategories = () => {
  const router = useRouter();

  const { data, isError } = useChallengeList();

  const categories = useMemo(
    () =>
      data
        ? data.result.participatedChallengeList.flatMap(
            ({ challengeId, imgUrl, title }) => ({
              challengeId,
              imgUrl,
              title,
            }),
          )
        : [],
    [data],
  );

  const [selectedChallengeId, setChallengeId] = useRoom(
    (state) => [state.challengeId, state.setChallengeId],
    shallow,
  );

  const handleClickCategory = (challengeId: number) => {
    setChallengeId(challengeId);
  };

  // TODO: react-error-boundary

  if (isError) {
    router.push('/not-found');
    return null;
  }

  return (
    <div className="relative flex h-[5.375rem] items-center justify-between">
      <div className="flex overflow-auto scrollbar-hide">
        {categories.map(({ challengeId, imgUrl, title }) => {
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
        })}
      </div>
    </div>
  );
};
