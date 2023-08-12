import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { EmojiInfoType, EmojiType } from '@/shared/types/feed';
import { createEmojiInfo } from '@/shared/utils/emoji';

import { Emoji } from './Emoji';
import { useDeleteEmoji, useUpdateEmoji } from './queries';

type EmojiContainerProps = {
  emojiInfo: EmojiInfoType;
  challengeId: string | number;
  recordId: number;
};

type TEmoji = {
  type: EmojiType;
  count: number;
  selected: boolean;
};

export const EmojiContainer = ({
  emojiInfo,
  challengeId,
  recordId,
}: EmojiContainerProps) => {
  const router = useRouter();

  const defaultEmojis = useMemo(
    () => [
      createEmojiInfo('CRAZY', emojiInfo.CRAZY, emojiInfo.selected),
      createEmojiInfo('REGRETFUL', emojiInfo.REGRETFUL, emojiInfo.selected),
      createEmojiInfo('WELLDONE', emojiInfo.WELLDONE, emojiInfo.selected),
      createEmojiInfo('comment', emojiInfo.comment, emojiInfo.selected),
    ],
    [emojiInfo],
  );

  const [emojis, setEmojis] = useState<TEmoji[]>([]);
  const [prevEmojis, setPrevEmojis] = useState<TEmoji[]>([]);

  const updateEmoji = useUpdateEmoji();
  const deleteEmoji = useDeleteEmoji();

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
    if (!defaultEmojis) {
      return;
    }

    setEmojis(defaultEmojis);
  }, [defaultEmojis]);

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
  );
};
