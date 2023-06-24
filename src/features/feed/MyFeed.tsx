import Image from 'next/image';
import { useState } from 'react';

import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { IconChevronRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { convertNumberToCurrency } from '@/shared/utils/currency';
import { TEmojiInfo } from '@/types/feed';

import { Emoji } from '../emoji';
import { reactType } from '../emoji/Emoji';

type MyFeedProps = {
  recordId: number;
  title: string;
  price: number;
  content: string;
  recordDate: string;
  emojiInfo: TEmojiInfo;
  challengeImgUrl?: string;
  challengeTitle?: string;
  recordImgUrl?: string;
  onClickFeed: (recordId: number) => void;
};

const MyFeed = ({
  recordId,
  title,
  price,
  content,
  recordDate,
  emojiInfo,
  challengeImgUrl = '',
  challengeTitle,
  recordImgUrl,
  onClickFeed,
}: MyFeedProps) => {
  const convertedDate = dayjs(recordDate).format('a hh:mm');
  const convertedPrice = convertNumberToCurrency({
    value: price,
    unitOfCurrency: '원',
  });
  const isChallengeExist = !!challengeImgUrl || !!challengeTitle;

  const [emojis, setEmojis] = useState<
    {
      type: reactType;
      count: number;
      selected: boolean;
    }[]
  >([
    {
      type: 'CRAZY',
      count: emojiInfo.CRAZY,
      selected: emojiInfo.selectedEmoji === 'CRAZY',
    },
    {
      type: 'REGRETFUL',
      count: emojiInfo.REGRETFUL,
      selected: emojiInfo.selectedEmoji === 'REGRETFUL',
    },
    {
      type: 'WELLDONE',
      count: emojiInfo.WELLDONE,
      selected: emojiInfo.selectedEmoji === 'WELLDONE',
    },
    {
      type: 'comment',
      count: emojiInfo.comment,
      selected: emojiInfo.selectedEmoji === 'comment',
    },
  ]);

  const getKoreanDate = (date: string) => {
    if (date.includes('am')) {
      return date.replace('am', '오전');
    }
    if (date.includes('pm')) {
      return date.replace('pm', '오후');
    }
    return '';
  };

  // TODO: 서버 데이터 호출 이후에 리턴 값을 emoji로 set하는 방식 ?
  const handleClickEmoji = (clickedEmojiType: reactType) => {
    console.log(`clicked emoji ${clickedEmojiType}`);
  };

  return (
    <li className="flex justify-end">
      <div>
        {recordImgUrl && (
          <>
            <div
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
            </div>
            <Spacing height={6} />
          </>
        )}
        <div className="relative">
          <div
            className="w-[13.75rem] rounded-md bg-white p-2.5"
            onClick={() => onClickFeed(recordId)}
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
          <div className="flex gap-1">
            {emojis.map(({ type, count }) => {
              return (
                <Emoji
                  key={uuidv4()}
                  type={type}
                  count={count}
                  onClickEmoji={handleClickEmoji}
                />
              );
            })}
          </div>
          <p className="font-caption-medium-sm absolute bottom-0 left-[-3.25rem] text-gray-50">
            {getKoreanDate(convertedDate)}
          </p>
        </div>
      </div>
    </li>
  );
};

export { MyFeed };
