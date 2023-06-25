import Link from 'next/link';
import React from 'react';

import { useUserChallengeList } from '@/features/record/queries';
import { cn } from '@/lib/utils';
import { IconArrowLeft } from '@/public/svgs';
import RecordBottomSheet from '@/shared/components/bottom-sheet/RecordBottomSheet';
import ChallengeList from '@/shared/components/challenge-list';
import { ChipGroup } from '@/shared/components/chip';
import { Status, StatusMap } from '@/shared/types/user';

const recordCategories: Status[] = ['PROCEEDING', 'SUCCESS', 'COMPLETED'];

const RecordPage = () => {
  const [status, setStatus] = React.useState<Status>('PROCEEDING');
  const [category, setCategory] = React.useState('전체');
  const { data } = useUserChallengeList();
  const select = (status: Status) => {
    setStatus(status);
  };

  return (
    <div className="relative flex h-full flex-col px-5">
      <header className="relative flex h-12 items-center justify-center">
        <Link href="/my-page" className="absolute left-0">
          <IconArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="font-title-medium-sm">거지방 기록</h1>
      </header>
      <div className="flex h-[3.25rem] overflow-x-scroll">
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
        <ChipGroup.Chip value="전체">전체</ChipGroup.Chip>
        <ChipGroup.Chip value="식비">식비</ChipGroup.Chip>
        <ChipGroup.Chip value="문화생활">문화생활</ChipGroup.Chip>
        <ChipGroup.Chip value="취미">취미</ChipGroup.Chip>
      </ChipGroup>
      <ChallengeList
        challenges={data?.result.participatedChallenges}
        category={category}
        status={status}
      />
      <RecordBottomSheet />
    </div>
  );
};

export default RecordPage;
