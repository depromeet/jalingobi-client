import { isEmpty } from 'lodash-es';

import ChallengeCard from '@/shared/components/challenge-card';
import { UserChallenge } from '@/shared/types/user';

import ChallengeNotFound from '../challenge/ChallengeNotFound';

type Props = {
  filteredCategoryList?: UserChallenge[];
};

const ChallengeList = ({ filteredCategoryList }: Props) => {
  if (isEmpty(filteredCategoryList)) {
    return <ChallengeNotFound />;
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
