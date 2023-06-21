import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { ChallengeRoomFeedList, MyRoomFeedList } from '@/features/feed';
import { ChallengeAchievement } from '@/my-poor-room/components/challenge-achievement';
import { ChallengeCategories } from '@/my-poor-room/components/challenge-categories';
import { Spacing } from '@/shared/components';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';

export default function MyPoorRoom() {
  const router = useRouter();
  const { challengeId } = router.query;
  const isMyRoom = !Number(challengeId);

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white">
        <ChallengeCategories />
        {!isMyRoom && <ChallengeAchievement />}
      </div>
      {isMyRoom ? <MyRoomFeedList /> : <ChallengeRoomFeedList />}
      <Spacing height={60} />
    </div>
  );
}

MyPoorRoom.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
