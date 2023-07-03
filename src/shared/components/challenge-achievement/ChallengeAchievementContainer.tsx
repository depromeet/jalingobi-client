import { useRouter } from 'next/router';

import { shallow } from 'zustand/shallow';

import { useChallengeAchievement } from '@/features/feed/queries';
import { useConvertChallengeAcievement } from '@/shared/hooks/useChallengeAchievement';
import { useRoom } from '@/shared/store/room';

import { ComponentLoading } from '../loading/ComponentLoading';

import { ChallengeAchievement } from './ChallengeAchievement';

export const ChallengeAchievementContainer = () => {
  const challengeId = useRoom((state) => state.challengeId, shallow);

  const router = useRouter();

  const { data, isLoading, isError } = useChallengeAchievement({ challengeId });

  const convertedData = useConvertChallengeAcievement(data || null);

  // TODO: react-error-boundary, suspense 도입하기
  if (isLoading) {
    return <ComponentLoading />;
  }

  if (isError) {
    router.push('/not-found');
    return null;
  }

  return <ChallengeAchievement {...convertedData} />;
};
