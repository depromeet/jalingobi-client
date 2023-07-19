import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { shallow } from 'zustand/shallow';

import { IconChevronRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { ImageLoader } from '@/shared/components/image';
import { useRoom } from '@/shared/store/room';
import { EmojiType, EmojiInfoType } from '@/shared/types/feed';
import { convertNumberToCurrency } from '@/shared/utils/currency';
import { getKoreanDate } from '@/shared/utils/date';
import { createEmojiInfo } from '@/shared/utils/emoji';

import { Emoji } from '../emoji/Emoji';
import { useDeleteEmoji, useUpdateEmoji } from '../emoji/queries';

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

type TEmoji = {
  type: EmojiType;
  count: number;
  selected: boolean;
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
  const router = useRouter();

  const challengeId = useRoom((state) => state.challengeId, shallow);

  const convertedDate = dayjs(recordDate).format('a hh:mm');
  const convertedCurrentCharge = convertNumberToCurrency({
    value: currentCharge,
    unitOfCurrency: '원',
  });
  const convertedPrice = convertNumberToCurrency({
    value: price,
    unitOfCurrency: '원',
  });

  const DEFAULT_EMOJIS = [
    createEmojiInfo('CRAZY', emojiInfo.CRAZY, emojiInfo.selected),
    createEmojiInfo('REGRETFUL', emojiInfo.REGRETFUL, emojiInfo.selected),
    createEmojiInfo('WELLDONE', emojiInfo.WELLDONE, emojiInfo.selected),
    createEmojiInfo('comment', emojiInfo.comment, emojiInfo.selected),
  ];

  const [emojis, setEmojis] = useState<TEmoji[]>(DEFAULT_EMOJIS);
  const [prevEmojis, setPrevEmojis] = useState<TEmoji[]>(DEFAULT_EMOJIS);

  const updateEmoji = useUpdateEmoji();
  const deleteEmoji = useDeleteEmoji();

  // TODO: 서버 호출 로직까지 작성한 이후에 리펙토링
  const handleClickEmoji = (clickedEmojiType: EmojiType) => {
    if (clickedEmojiType === 'comment') {
      router.push(
        `/expense-details?challengeId=${challengeId}&recordId=${recordId}`,
      );
      return;
    }

    setPrevEmojis(emojis);

    const clickedEmoji = emojis.find(
      (emoji) => emoji.type === clickedEmojiType,
    );
    const isClickedEmojiSelectedBefore = clickedEmoji?.selected;

    if (isClickedEmojiSelectedBefore) {
      deleteEmoji.mutate({
        recordId,
        type: clickedEmojiType,
      });

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

    updateEmoji.mutate({
      recordId,
      type: clickedEmojiType,
    });

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

  useEffect(() => {
    if (!updateEmoji.isError) {
      return;
    }

    setEmojis(prevEmojis);
  }, [updateEmoji.isError]);

  useEffect(() => {
    if (!deleteEmoji.isError) {
      return;
    }

    setEmojis(prevEmojis);
  }, [deleteEmoji.isError]);

  return (
    <li className="flex gap-[10px]">
      <div className="relative h-[2.625rem] w-[2.625rem] rounded-[0.625rem] object-cover ">
        <ImageLoader
          src={profileImgUrl}
          alt=""
          fill
          sizes="(max-width: 600px) 10vw"
        />
      </div>
      <div className="relative">
        <div className="flex items-center gap-[4px]">
          <p className="font-body-regular-sm w-40 truncate font-[600] text-black">
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
              <ImageLoader
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
        <div className="flex gap-1">
          {emojis.map(({ type, count, selected }, index) => {
            return (
              <Emoji
                key={index}
                type={type}
                count={count}
                selected={selected}
                onClickEmoji={handleClickEmoji}
              />
            );
          })}
        </div>
        <div className="absolute bottom-0 left-[14rem] flex">
          <p className="font-caption-medium-sm shrink-0 text-gray-50">
            {getKoreanDate(convertedDate)}
          </p>
        </div>
      </div>
    </li>
  );
};

export { OthersFeed };
