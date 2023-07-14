import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { useUserChallengeList } from '@/features/record/queries';
import { cn } from '@/lib/utils';
import { IconArrowLeft } from '@/public/svgs';
import RecordBottomSheet from '@/shared/components/bottom-sheet/RecordBottomSheet';
import ChallengeList from '@/shared/components/challenge-list';
import { ChipGroup } from '@/shared/components/chip';
import { ALL } from '@/shared/constant';
import { withAuth } from '@/shared/hof/withAuth';
import { Status, StatusMap } from '@/shared/types/user';

const recordCategories: Status[] = ['PROCEEDING', 'SUCCESS', 'COMPLETED'];

const RecordPage = () => {
  const [status, setStatus] = React.useState<Status>('PROCEEDING');
  const [uniqueCategorySet, setUniqueCategorySet] = React.useState<Set<string>>(
    new Set(),
  );
  const [category, setCategory] = React.useState('전체');
  const { data } = useUserChallengeList();

  useEffect(() => {
    const categoriesSet: Set<string> = new Set();
    categoriesSet.add(ALL);
    data?.result.participatedChallenges.forEach((challenge) => {
      challenge.categories.forEach((category) => {
        categoriesSet.add(category);
      });
    });
    setUniqueCategorySet(categoriesSet);
  }, [data?.result.participatedChallenges]);

  const select = (status: Status) => {
    setStatus(status);
  };

  const filteredCategoryList = data?.result.participatedChallenges
    .filter(
      (challenge) =>
        category === '전체' || challenge.categories.includes(category),
    )
    .filter((challenge) => challenge.status === status);

  return (
    <div className="relative flex h-full flex-col px-5">
      <header className="relative flex h-12 items-center justify-center">
        <Link href="/my-page" className="absolute left-0">
          <IconArrowLeft className="h-4 w-4" />
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
      <ChipGroup initialChips="전체" className="py-5" onChange={setCategory}>
        {Array.from(uniqueCategorySet).map((category, index) => (
          <ChipGroup.Chip value={category} key={index}>
            {category}
          </ChipGroup.Chip>
        ))}
      </ChipGroup>
      <ChallengeList filteredCategoryList={filteredCategoryList} />
      <RecordBottomSheet />
    </div>
  );
};

export default RecordPage;

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
