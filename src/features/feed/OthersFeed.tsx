import Image from 'next/image';

import dayjs from 'dayjs';
import { shallow } from 'zustand/shallow';

import { IconChevronRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { useRoom } from '@/shared/store/room';
import { EmojiInfoType } from '@/shared/types/feed';
import { convertNumberToCurrency } from '@/shared/utils/currency';

import { EmojiContainer } from '../emoji/EmojiContainer';

type OthersFeedProps = {
  recordId: number;
  price: number;
  currentCharge: number;
  nickname: string;
  title: string;
  content: string;
  recordDate: string;
  profileImgUrl: string;
  emojiInfo: EmojiInfoType;
  recordImgUrl?: string;
  onClickFeed: (recordId: number) => void;
};

const OthersFeed = ({
  recordId,
  price,
  currentCharge,
  profileImgUrl,
  nickname,
  title,
  content,
  recordDate,
  emojiInfo,
  recordImgUrl,
  onClickFeed,
}: OthersFeedProps) => {
  const challengeId = useRoom((state) => state.challengeId, shallow);

  const convertedDate = dayjs(recordDate).format('A hh:mm');
  const convertedCurrentCharge = convertNumberToCurrency({
    value: currentCharge,
    unitOfCurrency: '원',
  });
  const convertedPrice = convertNumberToCurrency({
    value: price,
    unitOfCurrency: '원',
  });

  return (
    <li className="flex gap-[10px]">
      <div className="relative h-[2.625rem] w-[2.625rem] rounded-[0.625rem] object-cover ">
        <Image
          src={profileImgUrl}
          alt=""
          fill
          sizes="(max-width: 600px) 10vw"
        />
      </div>
      <div className="relative">
        <div className="flex items-center gap-[4px]">
          <p className="font-body-regular-sm max-w-[160px] truncate font-[600] text-black">
            {nickname}
          </p>
          <p className="font-caption-medium-md text-gray-50 ">
            {convertedCurrentCharge}
          </p>
        </div>
        <Spacing height={8} />
        {recordImgUrl && (
          <>
            <button
              type="button"
              className="relative h-[9.125rem] w-[13.75rem] overflow-hidden rounded-md"
              onClick={() => onClickFeed(recordId)}
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
          onClick={() => onClickFeed(recordId)}
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
        </div>
        <Spacing height={8} />
        <EmojiContainer
          emojiInfo={emojiInfo}
          challengeId={challengeId}
          recordId={recordId}
        />
        <div className="absolute bottom-0 left-[14rem] flex">
          <p className="font-caption-medium-sm shrink-0 text-gray-50">
            {convertedDate}
          </p>
        </div>
      </div>
    </li>
  );
};

export { OthersFeed };
