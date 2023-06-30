import Image from 'next/image';
import React from 'react';

import { Participant } from '@/shared/types/challenge';

type Props = {
  participants?: Participant[];
};

export default function ChallengeParticipants({ participants }: Props) {
  const visibleParticipants =
    participants && participants?.length <= 2
      ? participants
      : participants?.slice(0, 2);

  return (
    <ul>
      {visibleParticipants?.map((participant, index) => (
        <li key={index} className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-x-2">
            <Image
              src={participant.imgUrl}
              width={40}
              height={40}
              alt="profile"
            />
            <span>{participant.nickname}</span>
          </div>
          <button
            className="font-caption-medium-md rounded-sm bg-gray-20 px-2 py-1 text-gray-60"
            type="button"
          >
            Lv {participant.level}
          </button>
        </li>
      ))}
    </ul>
  );
}
