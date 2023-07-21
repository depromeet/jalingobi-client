import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { IconClock, IconOverflow } from '@/public/svgs';
import ChallengeLeaveSheet from '@/shared/components/bottom-sheet/ChallengeLeaveSheet';
import RecordBottomSheet from '@/shared/components/bottom-sheet/RecordBottomSheet';
import { UserChallenge } from '@/shared/types/user';
import { isChallengeEnded } from '@/shared/utils/date/date';
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

  const handleOpenLeaveModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLeaveModalOpen(true);
  };

  return (
    <Link href={`/search/${challenge.challengeId}`}>
      <li
        key={challenge.challengeId}
        className="relative flex items-start gap-x-4 bg-gray-5 px-5 py-4"
      >
        <Image
          src={challenge.imgUrl}
          width={54}
          height={54}
          alt="item"
          className="aspect-square rounded-md"
        />
        {!isChallengeEnded(challenge.duration.endAt) && (
          <IconOverflow
            className="absolute right-5 top-4"
            onClick={openBottomSheet}
          />
        )}
        <div className="flex flex-col gap-y-[1px]">
          <div className="font-caption-medium-md flex items-center  gap-x-1 font-semibold">
            <span className="text-gray-50">
              {challenge.participantCount}/{challenge.availableCount}명
            </span>
            <span className="text-red-400">{challenge.statusTag}</span>
          </div>
          <h3 className="font-title-medium-sm">{challenge.title}</h3>
          <ul className="flex gap-x-1">
            {challenge.keywords.map((keyword, index) => (
              <li key={index} className="font-caption-medium-md text-gray-50">
                {keyword}
              </li>
            ))}
          </ul>
          <div className="font-caption-medium-md flex items-center gap-x-[2px] text-gray-60">
            <IconClock className="h-5 w-5" />
            <p>D{calculateDaysLeft(challenge.duration.startAt)} </p>
            <p>/</p>
            {challenge.duration.period}일 동안
          </div>
        </div>
        <RecordBottomSheet
          isOpen={isBottomSheetOpen}
          onOpenChange={setIsBottomSheetOpen}
          openLeaveModal={handleOpenLeaveModal}
        />
        <ChallengeLeaveSheet
          isOpen={isLeaveModalOpen}
          onOpenChange={setIsLeaveModalOpen}
          onOpenChangeBottomSheet={setIsBottomSheetOpen}
          challengeId={challenge.challengeId}
        />
      </li>
    </Link>
  );
};

export default ChallengeCard;
