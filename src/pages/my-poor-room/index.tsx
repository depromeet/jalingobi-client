import { ReactElement } from 'react';

import { AchievementOfChallengeInformation } from '@/my-poor-room/components/achievement-of-challenge-information';
import { ChallengeCategories } from '@/my-poor-room/components/challenge-categories';
import {
  ChallengeRoomFeedList,
  MyRoomFeedList,
} from '@/my-poor-room/components/feed-list';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';

export default function MyPoorRoom() {
  // TODO: my room 여부 연동 필요
  const isMyRoom = true;

  return (
    <div>
      <div className="sticky top-0 bg-white">
        <ChallengeCategories />
        {/* TODO: challenge room에서만 제공 필요 */}
        <AchievementOfChallengeInformation
          goalCharge={100000}
          currentCharge={42000}
          percent={42}
          dueDay={11}
        />
      </div>
      {/* TODO: 이것도 추상화 하면 좋을듯?  */}
      {isMyRoom ? <MyRoomFeedList /> : <ChallengeRoomFeedList />}
    </div>
  );
}

MyPoorRoom.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
