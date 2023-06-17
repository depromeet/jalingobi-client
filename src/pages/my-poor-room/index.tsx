import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { ChallengeAchievement } from '@/my-poor-room/components/challenge-achievement';
import { ChallengeCategories } from '@/my-poor-room/components/challenge-categories';
import { Divider } from '@/my-poor-room/components/Divider';
import {
  ChallengeRoomFeedList,
  MyRoomFeedList,
} from '@/my-poor-room/components/feed-list';
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
        {!isMyRoom && (
          <>
            <Divider />
            <ChallengeAchievement />
          </>
        )}
      </div>
      {isMyRoom ? <MyRoomFeedList /> : <ChallengeRoomFeedList />}
      <Spacing height={60} />
    </div>
  );
}

MyPoorRoom.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
