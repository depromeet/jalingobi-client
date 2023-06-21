import { IconComment, IconReaction } from '@/public/svgs';

export type reactType = 'crazy' | 'regretful' | 'wellDone' | 'comment';

type Props = {
  type: reactType;
  count: number;
  onClickEmoji: (type: reactType) => void;
};

export const Emoji = ({ type, count, onClickEmoji }: Props) => {
  const bgColor = {
    crazy: 'bg-system-danger',
    regretful: 'bg-secondary-dark',
    wellDone: 'bg-accent',
    comment: 'bg-gray-70',
  };

  return (
    <div
      className="flex h-7 w-[3.25rem] items-center justify-center gap-1.5 rounded bg-white"
      onClick={() => onClickEmoji(type)}
    >
      <div
        className={`h-5 w-5 rounded-full ${bgColor[type]} flex items-center justify-center p-1`}
      >
        {type === 'comment' ? <IconComment /> : <IconReaction />}
      </div>
      <p className="font-caption-medium-md text-gray-60">{count}</p>
    </div>
  );
};
