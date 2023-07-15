import Image from 'next/image';
import Link from 'next/link';

import { useChallengeSearch } from '@/features/challenge/queries';
import { IconClock } from '@/public/svgs';
import { categoryMap } from '@/shared/constants/challenge';
import { SortedType } from '@/shared/types/challenge';
import { calculateDaysLeft } from '@/shared/utils/time';

import ChallengeNotFound from '../challenge/ChallengeNotFound';

type Props = {
  category: keyof typeof categoryMap;
  sortedType: SortedType;
  filter: string;
};

export default function SearchChallengeList({
  category,
  sortedType,
  filter,
}: Props) {
  const { data } = useChallengeSearch({
    category: categoryMap[category],
    filter,
    sortedType,
  });
  const result = data?.result;
  if (!result?.challenges || result.challenges.length === 0) {
    return <ChallengeNotFound />;
  }

  return (
    <ul className="flex flex-col gap-y-2.5">
      {result.challenges?.map((challenge) => (
        <Link key={challenge.id} href={`/search/${challenge.id}`}>
          <li
            key={challenge.id}
            className="relative flex min-h-[130px] w-full items-start rounded-md bg-gray-5 px-5 py-4"
          >
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
              <h3 className="font-title-medium-sm">커피 5만원 이하로 쓰기</h3>
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
              <div className="font-caption-medium-md flex items-center gap-x-[2px] text-gray-60">
                <IconClock />
                <p>D{calculateDaysLeft(challenge.startAt)} /</p>
                {challenge.period}일 동안
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
