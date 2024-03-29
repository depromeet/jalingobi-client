import Image from 'next/image';
import { useRouter } from 'next/router';

import { isEmpty } from 'lodash-es';

import {
  useChallengeSearch,
  useUserChallengeList,
} from '@/features/challenge/queries';
import { NoChallengeAvailable } from '@/features/feed/NoChallengeAvailable';
import { IconClock } from '@/public/svgs';
import { CategoryKey, SortedType } from '@/shared/types/challenge';
import { calculateDaysLeft } from '@/shared/utils/time/time';

type Props = {
  categoryKey: CategoryKey;
  sortedType: SortedType;
  filter: string;
};

export default function SearchChallengeList({
  categoryKey,
  sortedType,
  filter,
}: Props) {
  const router = useRouter();
  const { data: userChallengeList } = useUserChallengeList();
  const { data } = useChallengeSearch({
    category: categoryKey,
    filter,
    sortedType,
  });
  const result = data?.result;

  if (isEmpty(result?.challenges)) {
    return (
      <NoChallengeAvailable
        title="리스트 준비 중입니다."
        description={
          <>
            <p>해당 거지방 리스트는 곧 업데이트 됩니다.</p>
            <p>조금만 기다려주세요!</p>
          </>
        }
      />
    );
  }

  const handleRouting = (challengeId: number) => {
    const isParticipated =
      userChallengeList?.result.participatedChallenges.some(
        (userChallenge) => userChallenge.challengeId === challengeId,
      );
    const route = isParticipated ? '/my-poor-room' : `/search/${challengeId}`;

    router.push(route);
  };

  return (
    <ul className="flex flex-col gap-y-2.5">
      {result?.challenges?.map((challenge) => {
        const daysLeft = calculateDaysLeft(challenge.startAt);
        return (
          <button
            key={challenge.id}
            className="text-left"
            onClick={() => handleRouting(challenge.id)}
            type="button"
          >
            <li className="relative flex min-h-[130px] w-full items-start rounded-md bg-gray-5 px-5 py-4">
              <Image
                src={challenge.imgUrl}
                width={54}
                height={54}
                alt="item"
                className="mr-4 aspect-square rounded-md"
              />
              <div className="col-span-3 flex flex-col gap-y-[1px]">
                <div className="font-caption-medium-md flex items-center  gap-x-1 font-semibold">
                  <span className="text-gray-50">
                    {challenge.currentPeopleCount}/
                    {challenge.availablePeopleCount}명
                  </span>
                  <span className="text-red-400">{challenge.status}</span>
                </div>
                <h3 className="font-title-medium-sm">{challenge.title}</h3>
                <ul className="flex gap-x-1">
                  {challenge.keywords.map((keyword, index) => (
                    <li
                      key={index}
                      className="font-caption-medium-md font-medium text-gray-50"
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
                <div className="font-caption-medium-md flex items-center gap-x-[0.5px] text-gray-60">
                  <IconClock />
                  {daysLeft > 0 ? <p>{daysLeft}일 뒤 시작</p> : <p>진행 중</p>}
                  <p>/</p>
                  {challenge.period}일 동안
                </div>
              </div>
            </li>
          </button>
        );
      })}
    </ul>
  );
}
