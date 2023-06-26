import Image from 'next/image';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { IconChevronRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { emojiType, TEmojiInfo } from '@/shared/types/feed';
import { convertNumberToCurrency } from '@/shared/utils/currency';
import { getKoreanDate } from '@/shared/utils/date';
import { createEmojiInfo } from '@/shared/utils/emoji';

import { Emoji } from '../emoji';
import { useDeleteEmoji, useUpdateEmoji } from '../emoji/queries';

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
  type: emojiType;
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
  const [prevEmojis, setPrevEmojis] = useState<TEmoji[]>(DEFAULT_EMOJIS);

  const updateEmoji = useUpdateEmoji();
  const deleteEmoji = useDeleteEmoji();

  // TODO: 이모지 컨테이너 분리하기
  // TODO: 서버 호출 로직까지 작성한 이후에 리펙토링
  const handleClickEmoji = (clickedEmojiType: emojiType) => {
    if (clickedEmojiType === 'comment') {
      return;
    }

    setPrevEmojis(emojis);

    const clickedEmoji = emojis.find(
      (emoji) => emoji.type === clickedEmojiType,
    );
    const isClickedEmojiSelectedBefore = clickedEmoji?.selected;

    if (isClickedEmojiSelectedBefore) {
      setEmojis((prev) =>
        prev.map((emoji) => {
          if (emoji.type === clickedEmojiType) {
            deleteEmoji.mutate({
              recordId,
              type: clickedEmojiType,
            });
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
          // TODO: debounce 적용이 필요할 수도.
          updateEmoji.mutate({
            recordId,
            type: clickedEmojiType,
          });
          return {
            ...emoji,
            selected: true,
            count: emoji.count + 1,
          };
        }
        if (emoji.selected) {
          // TODO: 민정님께 여쭤보기 delete를 넣어줘야 하나 ?
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
            {emojis.map(({ type, count }, index) => {
              return (
                <Emoji
                  key={index}
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
