import { ReactElement } from 'react';

import { AchievementOfChallengeInformation } from '@/my-poor-room/components/achievement-of-challenge-information';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';

export default function MyPoorRoom() {
  return (
    <div>
      <AchievementOfChallengeInformation
        goalCharge={100000}
        currentCharge={42000}
        percent={42}
        dueDay={11}
      />
    </div>
  );
}

MyPoorRoom.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
