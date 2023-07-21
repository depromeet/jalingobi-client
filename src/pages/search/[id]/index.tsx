import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useChallengeQuery } from '@/features/challenge/queries';
import { IconChevronLeft, IconRice } from '@/public/svgs';
import ChallengeFooter from '@/shared/components/challenge/ChallengeFooter';
import ChallengeParticipants from '@/shared/components/challenge/ChallengeParticipants';
import Rules from '@/shared/components/challenge/Rules';
import { categoryMap } from '@/shared/constants/challenge';

const ChallengeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const challengeId = typeof id === 'string' ? id : '';
  const { data: challenge } = useChallengeQuery(Number(challengeId));

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-auto">
        <section className="relative h-[348px]">
          <header className="relative h-12">
            <Link
              href="/search"
              className="absolute top-3 flex h-12 items-center justify-between p-3"
            >
              <IconChevronLeft className="absolute z-10 h-4 w-4  stroke-white text-white" />
            </Link>
          </header>
          {challenge?.result.challengeImgUrl && (
            <Image src={challenge?.result.challengeImgUrl} fill alt="item" />
          )}
        </section>
        <section className="px-5">
          <div className="pt-4">
            <div className="flex justify-between">
              <span className="font-body-regular-sm text-gray-60">
                {challenge?.result.dateInfo.period}일 동안
              </span>
              <div className="flex items-center justify-center gap-x-1 rounded-md bg-gray-10 px-2.5">
                <IconRice className="h-6 w-6" />
                {challenge && (
                  <span>{categoryMap[challenge.result.category]}</span>
                )}
              </div>
            </div>
            <h3 className="font-title-medium-sm font-semibold text-black">
              {challenge?.result.title}
            </h3>
            <span className="font-caption-medium-md text-gray-60">
              {challenge?.result.headCount.participants}/
              {challenge?.result.headCount.availableCount}명
            </span>
          </div>
          <Rules rules={challenge?.result.rules} />
          <ul className="font-body-regular-sm mb-4 flex gap-x-1 text-gray-50">
            {challenge?.result.keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
          <div>
            <div className="-ml-5 flex w-[calc(100%+40px)] items-center justify-between border-y-[1px] border-y-gray-30 px-5 py-2.5">
              <h5 className="font-body-regular-sm text-gray-50">참여 인원</h5>
              <span className="font-body-regular-sm text-gray-60">
                {challenge?.result.headCount.participants}명
              </span>
            </div>
            <ChallengeParticipants
              participants={challenge?.result.participantsInfo}
            />
          </div>
        </section>
      </div>
      <ChallengeFooter challenge={challenge?.result} />
    </div>
  );
};
export default ChallengeDetailPage;
