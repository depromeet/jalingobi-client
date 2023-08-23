import Image from 'next/image';

import dayjs from 'dayjs';

import { IconChevronRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { EmojiInfoType } from '@/shared/types/feed';
import { convertNumberToCurrency } from '@/shared/utils/currency';

import { EmojiContainer } from '../emoji/EmojiContainer';

export type MyFeedProps = {
  recordId: number;
  title: string;
  price: number;
  content: string;
  recordDate: string;
  emojiInfo: EmojiInfoType;
  challengeId?: string;
  challengeImgUrl?: string;
  challengeTitle?: string;
  recordImgUrl?: string;
  onClickFeed: (recordId: number, challengeId: string | undefined) => void;
};

const MyFeed = ({
  recordId,
  title,
  price,
  content,
  recordDate,
  emojiInfo,
  challengeId = '',
  challengeImgUrl = '',
  challengeTitle,
  recordImgUrl,
  onClickFeed,
}: MyFeedProps) => {
  const convertedDate = dayjs(recordDate).format('A hh:mm');

  const convertedPrice = convertNumberToCurrency({
    value: price,
    unitOfCurrency: '원',
  });
  const isChallengeExist = !!challengeImgUrl || !!challengeTitle;

  return (
    <li className="flex justify-end">
      <div className="relative">
        {recordImgUrl && (
          <>
            <button
              type="button"
              className="relative h-[9.125rem] w-[13.75rem] overflow-hidden rounded-md"
              onClick={() => onClickFeed(recordId, `${challengeId}`)}
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
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          className="relative w-[13.75rem] rounded-md bg-white p-2.5"
          onClick={() => onClickFeed(recordId, `${challengeId}`)}
        >
          <div className="font-body-regular-sm flex items-center justify-between font-[600] text-gray-70">
            <div>
              <p className="w-[6.75rem] truncate">{title}</p>
            </div>
            <div className="flex items-center gap-1.5 ">
              <p>{convertedPrice}</p>
              <IconChevronRight className="h-2 w-1 fill-none" />
            </div>
          </div>
          <p className="font-caption-medium-md truncate text-gray-50">
            {content}
          </p>
          <Spacing height={5} />
          {isChallengeExist && (
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
          )}
        </div>

        <Spacing height={8} />
        <EmojiContainer
          emojiInfo={emojiInfo}
          challengeId={challengeId}
          recordId={recordId}
        />
        <p className="font-caption-medium-sm absolute bottom-0 left-[-3.25rem] text-gray-50">
          {convertedDate}
        </p>
      </div>
    </li>
  );
};

export { MyFeed };
