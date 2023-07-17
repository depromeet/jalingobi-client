import React from 'react';

import {
  useLeaveChallenge,
  useUserChallengeList,
} from '@/features/challenge/queries';
import { IconCancel } from '@/public/svgs';
import { Button } from '@/shared/components/button';
import { Sheet, SheetContent, SheetHeader } from '@/shared/components/sheet';

type Props = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onOpenChangeBottomSheet?: (isOpen: boolean) => void;
  challengeId: number;
};

const ChallengeLeaveSheet = ({
  isOpen,
  onOpenChange,
  onOpenChangeBottomSheet,
  challengeId,
}: Props) => {
  const { mutateAsync } = useLeaveChallenge();
  const { refetch } = useUserChallengeList();

  const handleClickQuit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mutateAsync(challengeId);
    refetch();
    onOpenChangeBottomSheet?.(false);
    onOpenChange?.(false);
  };

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange?.(false);
  };

  return (
    <div className="relative">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          position="bottom"
          size="content"
          className="rounded-t-2xl bg-white"
        >
          <SheetHeader>
            <div className="relative mt-4 flex justify-center border-b-[1px] border-b-gray-20 pb-4">
              <h3>챌린지 나가기</h3>
              <IconCancel
                onClick={() => onOpenChange?.(false)}
                className="absolute right-4 top-0 h-4 w-4 stroke-1 text-gray-50"
              />
            </div>
          </SheetHeader>
          <div className="p-5">
            <div className="font-body-regular-lg flex flex-col p-5 text-center text-gray-70">
              <p>챌린지를 나가면</p>
              <p>자린고비 레벨에 변화가 있을 수 있습니다.</p>
              <p>그래도 챌린지를 나가겠습니까?</p>
            </div>
            <div className="flex items-center justify-center gap-x-2.5">
              <Button
                onClick={handleClickQuit}
                size="xs"
                className="font-body-regular-sm bg-system-danger"
              >
                나가기
              </Button>
              <Button
                size="xs"
                onClick={(e) => handleClickCancel(e)}
                className="font-body-regular-sm bg-gray-20 text-[#1E1E1E] text-opacity-50"
              >
                취소
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChallengeLeaveSheet;
