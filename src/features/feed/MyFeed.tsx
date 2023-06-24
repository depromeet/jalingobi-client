import Image from 'next/image';
import { useState } from 'react';

import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { IconChevronRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { convertNumberToCurrency } from '@/shared/utils/currency';
import { getKoreanDate } from '@/shared/utils/date';
import { createEmojiInfo } from '@/shared/utils/emoji';
import { reactType, TEmojiInfo } from '@/types/feed';

import { Emoji } from '../emoji';

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

type TEmoji = {
  type: reactType;
  count: number;
  selected: boolean;
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

  const DEFAULT_EMOJIS = [
    createEmojiInfo('CRAZY', emojiInfo.CRAZY, emojiInfo.selected),
    createEmojiInfo('REGRETFUL', emojiInfo.REGRETFUL, emojiInfo.selected),
    createEmojiInfo('WELLDONE', emojiInfo.WELLDONE, emojiInfo.selected),
    createEmojiInfo('comment', emojiInfo.comment, emojiInfo.selected),
  ];

  const [emojis, setEmojis] = useState<TEmoji[]>(DEFAULT_EMOJIS);

  // TODO: 서버 호출 로직까지 작성한 이후에 리펙토링
  const handleClickEmoji = (clickedEmojiType: reactType) => {
    if (clickedEmojiType === 'comment') {
      return;
    }

    const clickedEmoji = emojis.find(
      (emoji) => emoji.type === clickedEmojiType,
    );
    const isClickedEmojiSelectedBefore = clickedEmoji?.selected;

    if (isClickedEmojiSelectedBefore) {
      setEmojis((prev) =>
        prev.map((emoji) => {
          if (emoji.type === clickedEmojiType) {
            return {
              ...emoji,
              selected: false,
              count: emoji.count - 1,
            };
          }
          return emoji;
        }),
      );
      return;
    }

    setEmojis((prev) =>
      prev.map((emoji) => {
        if (emoji.type === clickedEmojiType) {
          return {
            ...emoji,
            selected: true,
            count: emoji.count + 1,
          };
        }
        if (emoji.selected) {
          return {
            ...emoji,
            selected: false,
            count: emoji.count - 1,
          };
        }
        return {
          ...emoji,
          selected: false,
        };
      }),
    );
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
