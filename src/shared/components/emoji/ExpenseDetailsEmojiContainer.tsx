import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import { useDeleteEmoji, useUpdateEmoji } from '@/features/emoji/queries';
import {
  IconCommentBig,
  IconCrazyBig,
  IconRegretfulBig,
  IconWelldoneBig,
} from '@/public/svgs';
import { EmojiInfoType, EmojiType, EmojiTypeName } from '@/shared/types/feed';
import { createEmojiInfo } from '@/shared/utils/emoji';

type EmojiStateType = {
  type: EmojiType;
  typeName: EmojiTypeName;
  count: number;
  selected: boolean;
};

const getIcon: Record<EmojiType, ReactNode> = {
  CRAZY: <IconCrazyBig className="h-10 w-10" />,
  REGRETFUL: <IconRegretfulBig className="h-10 w-10" />,
  WELLDONE: <IconWelldoneBig className="h-10 w-10" />,
  comment: <IconCommentBig className="h-10 w-10" />,
};

export const ExpenseDetailsEmojiContainer = (emojiInfo: EmojiInfoType) => {
  const { selected, CRAZY, REGRETFUL, WELLDONE } = emojiInfo;

  const router = useRouter();
  const { recordId } = router.query as { recordId: string };

  const updateEmoji = useUpdateEmoji();
  const deleteEmoji = useDeleteEmoji();

  const DEFAULT_EMOJIS: EmojiStateType[] = [
    { ...createEmojiInfo('CRAZY', CRAZY, selected), typeName: '미친거지' },
    {
      ...createEmojiInfo('REGRETFUL', REGRETFUL, selected),
      typeName: '후회할거지',
    },
    {
      ...createEmojiInfo('WELLDONE', WELLDONE, selected),
      typeName: '잘할거지',
    },
  ];

  const [emojis, setEmojis] = useState<EmojiStateType[]>(DEFAULT_EMOJIS);
  const [prevEmojis, setPrevEmojis] =
    useState<EmojiStateType[]>(DEFAULT_EMOJIS);

  const handleClickEmoji = (clickedEmojiType: EmojiType) => {
    setPrevEmojis(emojis);

    const clickedEmoji = emojis.find(
      (emoji) => emoji.type === clickedEmojiType,
    );
    const isClickedEmojiSelectedBefore = clickedEmoji?.selected;

    if (isClickedEmojiSelectedBefore) {
      deleteEmoji.mutate({
        recordId: Number(recordId),
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
      recordId: Number(recordId),
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
    <div className="flex justify-between px-6 py-4">
      {emojis.map((emoji, index) => {
        return (
          <button
            key={index}
            type="button"
            className="flex"
            onClick={() => handleClickEmoji(emoji.type)}
          >
            {getIcon[emoji.type]}
            <div className="flex w-14 flex-col items-center">
              <p className="font-caption-medium-sm text-gray-60">
                {emoji.typeName}
              </p>
              <p className="font-caption-medium-lg text-gray-70">
                {emoji.count}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
