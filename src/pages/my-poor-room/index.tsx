import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { ChallengeAchievement } from '@/my-poor-room/components/challenge-achievement';
import { ChallengeCategories } from '@/my-poor-room/components/challenge-categories';
import {
  ChallengeRoomFeedList,
  MyRoomFeedList,
} from '@/my-poor-room/components/feed-list';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';

export default function MyPoorRoom() {
  // TODO: my room 여부 연동 필요

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
    </div>
  );
}

MyPoorRoom.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
