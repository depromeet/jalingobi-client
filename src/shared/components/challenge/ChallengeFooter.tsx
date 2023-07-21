import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CheckIcon } from 'lucide-react';

import { useJoinChallenge } from '@/features/challenge/queries';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/shared/store/user';
import { ChallengeDetail } from '@/shared/types/challenge';
import { calculateDaysBetween, getDayOfWeek } from '@/shared/utils/date/date';
import { isChallengeDueSoon } from '@/shared/utils/time';

import { Button } from '../button';
import { Modal } from '../modal';

type Props = {
  challenge?: ChallengeDetail;
};

function ChallengeFooter({ challenge }: Props) {
  const router = useRouter();
  const join = useJoinChallenge(challenge?.challengeId);
  const dateInfo = challenge?.dateInfo;
  const startDate = dateInfo?.startAt;
  const endDate = dateInfo?.endAt;
  const user = useUserStore((state) => state.user);
  const isParticipatedChallenge = challenge?.participantsInfo?.some(
    (participant) => participant.userId === user?.id,
  );
  const isFull =
    challenge?.headCount.participants === challenge?.headCount.availableCount;
  const canParticipateChallenge = !isFull && challenge?.recruiting;

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

  const handleClickModal = () => {
    router.push('/my-poor-room');
  };

  return (
    <footer className="bottom-0 left-0 flex flex-[0_0_60px] items-center justify-between bg-white px-4 py-[18px]">
      <div>
        <p className={cn('font-body-regular-sm font-semibold text-primary')}>
          {isParticipatedChallenge
            ? '참가중'
            : isChallengeDueSoon(challenge?.dateInfo.startAt)
            ? '마감임박'
            : `D-${daysLeft}일 뒤 시작`}
        </p>
        <p>
          {startMonth}.{startDay} ({startDayOfWeek}) - {endMonth}.{endDay} (
          {endDayOfWeek})
        </p>
      </div>
      {!isParticipatedChallenge && (
        <Modal
          trigger={
            <Button
              onClick={() => join.mutate()}
              size="sm"
              variant={canParticipateChallenge ? 'primary' : 'disabled'}
              disabled={!canParticipateChallenge}
            >
              {canParticipateChallenge ? ' 거지방 참가하기' : '마감된 챌린지'}
            </Button>
          }
        >
          <div className="flex flex-col items-center px-[5px]">
            <header className="font-title-medium-md flex flex-col items-center justify-center font-semibold">
              <h3 className="text-primary">{challenge?.title}</h3>
              <p className="text-black">
                {endMonth}월 {endDay}일부터 시작!
              </p>
            </header>
            <div className="flex w-full flex-col items-center pb-8 pt-5">
              <h4 className="font-body-regular-sm font-semibold text-gray-60">
                규칙
              </h4>
              <article className="my-2.5 flex w-full flex-col items-start rounded-md bg-gray-10 p-2.5">
                <ul className="font-body-regular-sm col-span-5 flex flex-col gap-y-1.5 text-gray-60">
                  {challenge?.rules?.map((rule, index) => (
                    <li key={index} className="flex items-center gap-x-2.5">
                      <CheckIcon className="h-3 w-3" strokeWidth={3} />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <span className="text-gray-50">해당 규칙을 준수해주세요!</span>
            </div>
            <Button
              disabled={!challenge?.recruiting}
              onClick={handleClickModal}
              variant={challenge?.recruiting ? 'primary' : 'disabled'}
              size="md"
            >
              {challenge?.recruiting ? '확인' : '마감된 챌린지'}
            </Button>
          </div>
        </Modal>
      )}
    </footer>
  );
}

export default ChallengeFooter;
