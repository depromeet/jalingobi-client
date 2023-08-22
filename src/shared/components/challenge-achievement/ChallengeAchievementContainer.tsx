import { useRouter } from 'next/router';

import { shallow } from 'zustand/shallow';

import { useChallengeAchievement } from '@/features/feed/queries';
import { useConvertChallengeAcievement } from '@/shared/hooks/useChallengeAchievement';
import { useRoom } from '@/shared/store/room';

import { ChallengeAchievement } from './ChallengeAchievement';

export const ChallengeAchievementContainer = () => {
  const challengeId = useRoom((state) => state.challengeId, shallow);

  const router = useRouter();

  const { data, isError } = useChallengeAchievement({ challengeId });

  const convertedData = useConvertChallengeAcievement(data ?? null);

  // TODO: react-error-boundary

  if (isError) {
    router.push('/not-found');
    return null;
  }

  return <ChallengeAchievement {...convertedData} />;
};
