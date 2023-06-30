import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { IconClock, IconOverflow } from '@/public/svgs';
import ChallengeLeaveSheet from '@/shared/components/bottom-sheet/ChallengeLeaveSheet';
import RecordBottomSheet from '@/shared/components/bottom-sheet/RecordBottomSheet';
import { UserChallenge } from '@/shared/types/user';
import { calculateDaysLeft } from '@/shared/utils/time';

type Props = {
  challenge: UserChallenge;
};

const ChallengeCard = ({ challenge }: Props) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = React.useState(false);

  const openBottomSheet = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    setIsBottomSheetOpen(true);
  };
  return (
    <Link href={`/search/${challenge.challengeId}`}>
      <li
        key={challenge.challengeId}
        className="relative grid min-h-[130px] w-full grid-cols-4 rounded-md bg-gray-5 px-5 py-4"
      >
        <Image
          src={challenge.imgUrl}
          width={54}
          height={54}
          alt="item"
          className="relative top-5  mx-auto"
        />
        {challenge.active && (
          <IconOverflow
            className="absolute right-5 top-4"
            onClick={openBottomSheet}
          />
        )}
        <div className="col-span-3 flex flex-col gap-y-[1px]">
          <div className="font-caption-medium-md flex items-center  gap-x-1 font-semibold">
            <span className="text-gray-50">
              {challenge.participantCount}/{challenge.availableCount}명
            </span>
            {challenge.statusTag?.map((tag, index) => (
              <span key={index} className="text-red-400">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-title-medium-sm">커피 5만원 이하로 쓰기</h3>
          <ul className="flex gap-x-1">
            {challenge.keywords.map((keyword, index) => (
              <li key={index} className="font-caption-medium-md text-gray-50">
                #{keyword}
              </li>
            ))}
          </ul>
          <div className="font-caption-medium-md flex items-center gap-x-[2px] text-gray-60">
            <IconClock />
            <p>D{calculateDaysLeft(challenge.duration.startAt)} /</p>
            {challenge.duration.period}일 동안
          </div>
        </div>
        <RecordBottomSheet
          isOpen={isBottomSheetOpen}
          onOpenChange={setIsBottomSheetOpen}
          openLeaveModal={() => setIsLeaveModalOpen(true)}
        />
        <ChallengeLeaveSheet
          isOpen={isLeaveModalOpen}
          onOpenChange={setIsLeaveModalOpen}
          challengeId={challenge.challengeId}
        />
      </li>
    </Link>
  );
};

export default ChallengeCard;
