import Link from 'next/link';
import React, { useEffect } from 'react';

import { useUserChallengeList } from '@/features/challenge/queries';
import { cn } from '@/lib/utils';
import { IconArrowLeft } from '@/public/svgs';
import RecordBottomSheet from '@/shared/components/bottom-sheet/RecordBottomSheet';
import ChallengeList from '@/shared/components/challenge-list';
import { ChipGroup } from '@/shared/components/chip';
import { categoryReverseMap } from '@/shared/constants/challenge';
import { ChallengeStatus, Status, StatusMap } from '@/shared/types/user';

const recordCategories: Status[] = ['PROCEEDING', 'SUCCESS', 'COMPLETED'];

const RecordPage = () => {
  const [status, setStatus] = React.useState<Status>('PROCEEDING');
  const [uniqueCategorySet, setUniqueCategorySet] = React.useState<
    Set<keyof typeof categoryReverseMap>
  >(new Set());
  const [category, setCategory] = React.useState('ALL');
  const { data } = useUserChallengeList();

  useEffect(() => {
    const categoriesSet: Set<keyof typeof categoryReverseMap> = new Set();
    categoriesSet.add('ALL');
    data?.result.participatedChallenges.forEach((challenge) => {
      categoriesSet.add(challenge.category);
    });
    setUniqueCategorySet(categoriesSet);
  }, [data?.result.participatedChallenges]);

  const select = (status: Status) => {
    setStatus(status);
  };

  const filterChallengeStatusCallbackFn = (
    challengeStatus: keyof ChallengeStatus,
    status: keyof ChallengeStatus,
  ) => {
    if (
      ['PROCEEDING', 'WAITING'].includes(challengeStatus) &&
      status === 'PROCEEDING'
    ) {
      return true;
    }

    if (challengeStatus === 'SUCCESS' && status === 'SUCCESS') {
      return true;
    }

    if (
      ['FAILURE', 'SUCCESS'].includes(challengeStatus) &&
      status === 'COMPLETED'
    ) {
      return true;
    }

    return false;
  };

  const filteredCategoryList = data?.result.participatedChallenges
    .filter(
      (challenge) =>
        category === 'ALL' || challenge.category.includes(category),
    )
    .filter((challenge) =>
      filterChallengeStatusCallbackFn(challenge.status, status),
    );

  return (
    <div className="relative flex h-full flex-col px-5">
      <header className="relative flex h-12 items-center justify-center">
        <Link href="/my-page" className="absolute left-0">
          <IconArrowLeft className="h-4 w-4 stroke-gray-50" />
        </Link>
        <h1 className="font-title-medium-sm">거지방 기록</h1>
      </header>
      <div className="flex h-[3.25rem]">
        {recordCategories.map((category, index) => (
          <button
            type="button"
            aria-label={category}
            onClick={() => {
              select(category);
            }}
            key={index}
            className={cn(
              `font-body-regular-lg flex flex-1 items-center justify-center font-semibold text-gray-50 transition-colors duration-500`,
              {
                'border-b-2 border-primary text-primary': status === category,
              },
            )}
          >
            {StatusMap[category]}
          </button>
        ))}
      </div>
      <ChipGroup initialChips="ALL" className="py-5" onChange={setCategory}>
        {Array.from(uniqueCategorySet).map((category, index) => (
          <ChipGroup.Chip value={category} key={index}>
            {categoryReverseMap[category]}
          </ChipGroup.Chip>
        ))}
      </ChipGroup>
      <ChallengeList filteredCategoryList={filteredCategoryList} />
      <RecordBottomSheet />
    </div>
  );
};

export default RecordPage;
