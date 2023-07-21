import { ReactElement, useState } from 'react';

import ChallengeFilterSheet from '@/shared/components/bottom-sheet/ChallengeFilter.Sheet';
import { ChipGroup } from '@/shared/components/chip';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';
import SearchChallengeList from '@/shared/components/search-challenge';
import { Toggle } from '@/shared/components/toggle';
import { categoryMap } from '@/shared/constants/challenge';
import { CategoryKey, SortedType } from '@/shared/types/challenge';

import { categoryIconMap } from './[id]';

const chips: CategoryKey[] = [
  'FOOD',
  'HOBBY_LEISURE',
  'FASHION_BEAUTY',
  'TRANSPORTATION_AUTOMOBILE',
];

function Search() {
  const [category, setCategory] = useState<CategoryKey>('ALL'); // ['전체', '식비', '문화생활', '취미'
  const [showOnlyActiveRoom, setShowOnlyActiveRoom] = useState(true);
  const [sortedType, setSortedType] = useState<SortedType>('인원순');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSortedTypeChange = (sortedType: SortedType) => {
    setSortedType(sortedType);
  };

  const openSheet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBottomSheetOpen(true);
  };

  return (
    <div className="px-5">
      <header className="flex h-12 items-center justify-between">
        <h2 className="font-title-medium-md">거지방 탐색</h2>
      </header>
      <ChipGroup
        onChange={setCategory as (value: string) => void}
        initialChips={category}
        className="my-2.5 mb-4"
      >
        <ChipGroup.Chip value="ALL" className="inline-block shrink-0">
          전체
        </ChipGroup.Chip>
        {chips.map((chip) => (
          <ChipGroup.Chip key={chip} className="flex gap-x-1" value={chip}>
            {category === chip
              ? categoryIconMap[chip].selected
              : categoryIconMap[chip].default}
            <span>{categoryMap[chip]}</span>
          </ChipGroup.Chip>
        ))}
      </ChipGroup>
      <div className="flex justify-between">
        <div className="flex items-start gap-x-1 pb-7">
          <span className="font-body-regular-sm text-gray-70">
            모집 중인 방만 보기
          </span>
          <Toggle
            checked={showOnlyActiveRoom}
            onClick={() => setShowOnlyActiveRoom((prev) => !prev)}
          />
        </div>
        <ChallengeFilterSheet
          isSheetOpen={isBottomSheetOpen}
          openSheet={openSheet}
          setIsSheetOpen={setIsBottomSheetOpen}
          sortedBy={sortedType}
          handleSortedTypeChange={handleSortedTypeChange}
        />
      </div>
      <SearchChallengeList
        categoryKey={category}
        sortedType={sortedType}
        filter={showOnlyActiveRoom ? '' : 'all'}
      />
    </div>
  );
}
Search.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};

export default Search;
