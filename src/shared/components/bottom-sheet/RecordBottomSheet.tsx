import Link from 'next/link';
import React, { MouseEvent } from 'react';

import { Sheet, SheetContent, SheetHeader } from '@/shared/components/sheet';

type Props = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  openLeaveModal?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const RecordBottomSheet = ({ isOpen, onOpenChange, openLeaveModal }: Props) => {
  return (
    <div className="relative">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          position="bottom"
          size="content"
          className="rounded-t-2xl bg-white px-6"
        >
          <SheetHeader className="h-6">
            <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-xl bg-gray-30" />
          </SheetHeader>
          <ul className="font-body-regular-lg flex flex-col gap-y-2.5 text-gray-70">
            <Link href="/my-page/profile" className="py-2.5">
              <span>프로필 변경</span>
            </Link>
            <button
              type="button"
              className="w-full py-2.5 text-left"
              onClick={(e) => openLeaveModal?.(e)}
            >
              <span>챌린지 나가기</span>
            </button>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RecordBottomSheet;
