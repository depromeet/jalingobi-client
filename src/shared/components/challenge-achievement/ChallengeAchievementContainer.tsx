import { useChallengeAchievement } from '@/features/feed/queries';
import { useConvertChallengeAcievement } from '@/shared/hooks/useChallengeAchievement';
import { useRoom } from '@/shared/store/room';

import { ChallengeAchievement } from './ChallengeAchievement';

export const ChallengeAchievementContainer = () => {
  const challengeId = useRoom((state) => state.challengeId);

  const { data, isLoading, isError } = useChallengeAchievement({ challengeId });

  const convertedData = useConvertChallengeAcievement(data || null);

  // TODO: react-error-boundary, suspense 도입하기
  // TODO: 디자인 팀에 에러 페이지, 로더 요청하기
  if (isLoading) {
    return <>...Loading</>;
  }

  if (isError) {
    return <>Error Page</>;
  }

  return <ChallengeAchievement {...convertedData} />;
};
