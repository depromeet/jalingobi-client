import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import {
  IconCommentSmall,
  IconCrazySmall,
  IconRegretfulSmall,
  IconWelldoneSmall,
} from '@/public/svgs';
import { EmojiType } from '@/shared/types/feed';

type Props = {
  type: EmojiType;
  count: number;
  onClickEmoji: (type: EmojiType) => void;
};

const getIcon: Record<EmojiType, ReactNode> = {
  CRAZY: <IconCrazySmall className="h-5 w-5" />,
  REGRETFUL: <IconRegretfulSmall className="h-5 w-5" />,
  WELLDONE: <IconWelldoneSmall className="h-5 w-5" />,
  comment: <IconCommentSmall className="h-5 w-5" />,
};

export const Emoji = ({ type, count, onClickEmoji }: Props) => {
  const bgColor = {
    CRAZY: 'bg-[#FFD2B5]',
    REGRETFUL: 'bg-[#FFEEAF]',
    WELLDONE: 'bg-[#BBE0FF]',
    comment: 'bg-gray-30',
  };

  return (
    <button
      type="button"
      className={cn(
        `flex h-7 w-[3.25rem] items-center justify-center gap-1.5 rounded bg-white ${
          count > 0 && bgColor[type]
        }`,
      )}
      onClick={() => onClickEmoji(type)}
    >
      {getIcon[type]}
      <p className="font-caption-medium-md text-gray-60">{count}</p>
    </button>
  );
};
