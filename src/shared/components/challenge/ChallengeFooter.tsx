import React, { useMemo } from 'react';

import { useJoinChallenge } from '@/features/challenge/queries';
import { cn } from '@/lib/utils';
import { IconX } from '@/public/svgs';
import { ChallengeDetail } from '@/shared/types/challenge';
import { calculateDaysBetween, getDayOfWeek } from '@/shared/utils/date';
import { isChallengeDueSoon } from '@/shared/utils/time';

import { Button } from '../button';
import { Modal } from '../modal';

type Props = {
  challenge?: ChallengeDetail;
};

function ChallengeFooter({ challenge }: Props) {
  const join = useJoinChallenge(challenge?.challengeId);
  const dateInfo = challenge?.dateInfo;
  const startDate = dateInfo?.startAt;
  const endDate = dateInfo?.endAt;
  const daysLeft = useMemo(
    () => calculateDaysBetween(startDate, endDate),
    [endDate],
  );
  const startDayOfWeek = getDayOfWeek(startDate);
  const endDayOfWeek = getDayOfWeek(endDate);
  const startMonth = startDate && (new Date(startDate)?.getMonth?.() ?? 0) + 1;
  const endMonth = endDate && (new Date(endDate)?.getMonth?.() ?? 0) + 1;
  const startDay = startDate && (new Date(startDate)?.getDate?.() ?? 1);
  const endDay = endDate && (new Date(endDate)?.getDate?.() ?? 1);

  return (
    <footer className="bottom-0 left-0 flex flex-[0_0_60px] items-center justify-between bg-white px-4 py-[18px]">
      <div>
        <span
          className={cn('font-body-regular-sm font-semibold', {
            'text-system-danger': isChallengeDueSoon(
              challenge?.dateInfo.startAt,
            ),
          })}
        >
          {isChallengeDueSoon(challenge?.dateInfo.startAt)
            ? '마감임박'
            : `D-${daysLeft}일 뒤 시작`}
        </span>
        <p>
          {startMonth}.{startDay} ({startDayOfWeek}) - {endMonth}.{endDay} (
          {endDayOfWeek})
        </p>
      </div>
      <Modal
        trigger={
          <Button onClick={() => join.mutate()} size="sm">
            거지방 참가하기
          </Button>
        }
      >
        <div className="flex flex-col items-center px-[5px]">
          <div className="font-title-medium-md flex flex-col items-center justify-center text-black">
            <h3 className="text-primary">{challenge?.title}</h3>
            <p>
              {endMonth}월 {endDay}일부터 시작!
            </p>
          </div>
          <div className="flex w-full flex-col items-center pb-8 pt-5">
            <h4 className="font-body-regular-sm font-semibold">규칙</h4>
            <article className="my-2.5 grid grid-cols-6 items-center rounded-md bg-gray-10 px-2.5 py-3">
              <ul className="font-body-regular-sm col-span-5 flex flex-col gap-y-1.5 text-gray-60">
                {challenge?.rules?.map((rule, index) => (
                  <li key={index} className="flex items-center gap-x-2">
                    <IconX className="h-3 w-3" strokeWidth={5} />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </article>
            <span className="text-gray-50">해당 규칙을 준수해주세요!</span>
          </div>
          <Button
            variant={challenge?.recruiting ? 'primary' : 'disabled'}
            size="md"
          >
            {challenge?.recruiting ? '참가하기' : '마감된 챌린지'}
          </Button>
        </div>
      </Modal>
    </footer>
  );
}

export default ChallengeFooter;
