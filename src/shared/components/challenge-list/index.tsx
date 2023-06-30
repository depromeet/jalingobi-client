import React from 'react';

import { Button } from '@/shared/components/button';
import ChallengeCard from '@/shared/components/challenge-card';
import { Status, UserChallenge } from '@/shared/types/user';

type Props = {
  challenges?: UserChallenge[];
  category: string;
  status?: Status;
};

const ChallengeList = ({ challenges, category, status }: Props) => {
  const filteredCategoryList =
    challenges &&
    challenges
      .filter(
        (challenge) =>
          category === '전체' || challenge.categories.includes(category),
      )
      .filter((challenge) => challenge.status === status);

  if (!challenges || filteredCategoryList?.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-y-5">
        <p className="font-body-regular-lg text-gray-60">
          아직 아무기록이 없어요
        </p>
        <Button size="md">거지방 둘러보러 가기</Button>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-y-2.5">
      {filteredCategoryList?.map((challenge) => (
        <ChallengeCard key={challenge.challengeId} challenge={challenge} />
      ))}
    </ul>
  );
};

export default ChallengeList;
