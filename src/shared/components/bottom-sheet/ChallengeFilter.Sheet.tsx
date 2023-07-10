import React, { useRef } from 'react';

import { IconFilter2 } from '@/public/svgs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/components/sheet';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { SortedType } from '@/shared/types/challenge';

type Props = {
  sortedBy: SortedType;
  handleSortedTypeChange: (sortedType: SortedType) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChallengeFilterSheet = ({
  sortedBy,
  handleSortedTypeChange,
  isSheetOpen,
  setIsSheetOpen,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null!);
  const closeSheet = () => {
    if (!isSheetOpen) return;
    setIsSheetOpen(false);
  };

  useClickOutside(contentRef, closeSheet);

  return (
    <div className="relative">
      <Sheet open={isSheetOpen}>
        <SheetTrigger asChild>
          <div className="font-body-regular-lg flex items-center text-gray-50">
            <button type="button" onClick={() => setIsSheetOpen(true)}>
              {sortedBy}
            </button>
            <IconFilter2 className="h-4 w-4" />
          </div>
        </SheetTrigger>
        <SheetContent
          ref={contentRef}
          position="bottom"
          size="content"
          className="rounded-t-2xl bg-white"
        >
          <SheetHeader>
            <div className="h-2.5 rounded-t-2xl">
              <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 bg-gray-30" />
            </div>
          </SheetHeader>
          <ul className="font-body-regular-lg flex flex-col gap-y-2.5 text-gray-70">
            <li className="px-5 py-2.5">
              <button
                className="w-full text-left"
                type="button"
                onClick={() => {
                  handleSortedTypeChange('인원순');
                  setIsSheetOpen(false);
                }}
              >
                인원순
              </button>
            </li>
            <li className="px-5 py-2.5">
              <button
                className="w-full text-left"
                type="button"
                onClick={() => {
                  handleSortedTypeChange('금액 낮은순');
                  setIsSheetOpen(false);
                }}
              >
                금액 낮은순
              </button>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChallengeFilterSheet;
