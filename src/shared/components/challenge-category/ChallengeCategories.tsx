import { useRouter } from 'next/router';

import { shallow } from 'zustand/shallow';

import { useChallengeList } from '@/features/feed/queries';
import { useRoom } from '@/shared/store/room';

import { PageLoading } from '../loading';

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

  // TODO: react-error-boundary, suspense 도입하기
  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    router.push('/not-found');
    return null;
  }

  return (
    <div className="relative flex h-[5.375rem] items-center justify-between">
      <div className="flex overflow-auto scrollbar-hide">
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
    </div>
  );
};
