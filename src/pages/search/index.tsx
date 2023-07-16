import { ReactElement, useState } from 'react';

import {
  IconCar,
  IconClothes,
  IconHobby,
  IconRice,
  IconSelectedCar,
  IconSelectedClothes,
  IconSelectedHobby,
  IconSelectedRice,
} from '@/public/svgs';
import ChallengeFilterSheet from '@/shared/components/bottom-sheet/ChallengeFilter.Sheet';
import { ChipGroup } from '@/shared/components/chip';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';
import SearchChallengeList from '@/shared/components/search-challenge';
import { Toggle } from '@/shared/components/toggle';
import { useHandleBack } from '@/shared/hooks';
import { CategoryKey, SortedType } from '@/shared/types/challenge';

function Search() {
  useHandleBack();
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
      <header className="mb-2.5 flex h-12 items-center justify-between">
        <h2 className="font-title-medium-md">거지방 탐색</h2>
      </header>
      <ChipGroup
        onChange={setCategory as (value: string) => void}
        initialChips="전체"
        className="mb-4"
      >
        <ChipGroup.Chip value="ALL" className="inline-block shrink-0">
          전체
        </ChipGroup.Chip>
        <ChipGroup.Chip value="FOOD">
          {category === 'FOOD' ? (
            <IconSelectedRice className="mr-1 h-6 w-6" />
          ) : (
            <IconRice className="mr-1 h-6 w-6" />
          )}
          <span>식비</span>
        </ChipGroup.Chip>
        <ChipGroup.Chip value="HOBBY_LEISURE">
          {category === 'HOBBY_LEISURE' ? (
            <IconSelectedHobby className="mr-1 h-6 w-6" />
          ) : (
            <IconHobby className="mr-1 h-6 w-6" />
          )}
          <span>취미/여가</span>
        </ChipGroup.Chip>
        <ChipGroup.Chip value="FASHION_BEAUTY">
          {category === 'FASHION_BEAUTY' ? (
            <IconSelectedClothes className="mr-1 h-6 w-6" />
          ) : (
            <IconClothes className="mr-1 h-6 w-6" />
          )}
          패션/뷰티
        </ChipGroup.Chip>
        <ChipGroup.Chip value="TRANSPORTATION_AUTOMOBILE">
          {category === 'TRANSPORTATION_AUTOMOBILE' ? (
            <IconSelectedCar className="mr-1 h-6 w-6" />
          ) : (
            <IconCar className="mr-1 h-6 w-6" />
          )}
          교통/차량
        </ChipGroup.Chip>
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
