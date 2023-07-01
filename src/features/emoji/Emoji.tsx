import { IconComment, IconReaction } from '@/public/svgs';
import { EmojiType } from '@/shared/types/feed';

type Props = {
  type: EmojiType;
  count: number;
  onClickEmoji: (type: EmojiType) => void;
};

export const Emoji = ({ type, count, onClickEmoji }: Props) => {
  const bgColor = {
    CRAZY: 'bg-system-danger',
    REGRETFUL: 'bg-secondary-dark',
    WELLDONE: 'bg-accent',
    comment: 'bg-gray-70',
  };

  return (
    <button
      type="button"
      className="flex h-7 w-[3.25rem] items-center justify-center gap-1.5 rounded bg-white"
      onClick={() => onClickEmoji(type)}
    >
      <div
        className={`h-5 w-5 rounded-full ${bgColor[type]} flex items-center justify-center p-1`}
      >
        {type === 'comment' ? <IconComment /> : <IconReaction />}
      </div>
      <p className="font-caption-medium-md text-gray-60">{count}</p>
    </button>
  );
};
