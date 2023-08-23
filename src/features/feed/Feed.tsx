import Image from 'next/image';

import { IconChevronRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { convertNumberToCurrency } from '@/shared/utils/currency';

export type FeedProps = {
  challengeId: string;
  challengeImgUrl?: string;
  challengeTitle?: string;
  content: string;
  currentCharge?: number;
  nickname?: string;
  price: number;
  profileImgUrl?: string;
  recordId: number;
  recordImgUrl?: string;
  title: string;
  onClickFeed?: (recordId: number, challengeId: string) => void;
};

const Feed = ({
  challengeId,
  challengeImgUrl = '',
  challengeTitle,
  content,
  currentCharge,
  nickname,
  price,
  profileImgUrl,
  recordId,
  recordImgUrl,
  title,
  onClickFeed = () => null,
}: FeedProps) => {
  const convertedCurrentCharge = convertNumberToCurrency({
    value: currentCharge ?? 0,
    unitOfCurrency: '원',
  });
  const convertedPrice = convertNumberToCurrency({
    value: price,
    unitOfCurrency: '원',
  });
  const isChallengeExist = !!challengeImgUrl || !!challengeTitle;

  return (
    <section className="flex gap-2.5">
      {profileImgUrl && (
        <div className="relative h-[2.625rem] w-[2.625rem] rounded-[0.625rem] object-cover">
          <Image
            src={profileImgUrl ?? ''}
            alt=""
            fill
            sizes="(max-width: 600px) 10vw"
          />
        </div>
      )}
      <div className="relative">
        {nickname && convertedCurrentCharge && (
          <div className="flex items-center gap-[4px]">
            <p className="font-body-regular-sm max-w-[160px] truncate font-[600] text-black">
              {nickname}
            </p>
            <p className="font-caption-medium-md text-gray-50 ">
              {convertedCurrentCharge}
            </p>
          </div>
        )}
        <Spacing height={8} />
        {recordImgUrl && (
          <>
            <button
              type="button"
              className="relative h-[9.125rem] w-[13.75rem] overflow-hidden rounded-md"
              onClick={() => onClickFeed(recordId, challengeId)}
            >
              <Image
                src={recordImgUrl}
                alt="피드 이미지"
                fill
                className="object-cover"
                sizes="(max-width: 600px) 60vw"
              />
            </button>
            <Spacing height={6} />
          </>
        )}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="relative w-[13.75rem] rounded-md bg-white p-2.5"
          onClick={() => onClickFeed(recordId, challengeId)}
        >
          <div className="font-body-regular-sm flex items-center justify-between font-[600] text-gray-70">
            <p className="w-[6.75rem] truncate">{title}</p>
            <div className="flex items-center gap-1.5 ">
              <p>{convertedPrice}</p>
              <IconChevronRight className="h-2 w-1 fill-none" />
            </div>
          </div>
          <p className="font-caption-medium-md truncate text-gray-50">
            {content}
          </p>
          {isChallengeExist && (
            <>
              <Spacing height={5} />
              <div className="flex gap-[5px]">
                <div className="relative h-[1.125rem] w-[1.125rem]">
                  <Image
                    src={challengeImgUrl}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 10vw"
                  />
                </div>
                <p className="font-caption-medium-md w-44 truncate text-gray-60">
                  {challengeTitle}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export { Feed };
