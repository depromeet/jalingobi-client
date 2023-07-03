import clsx from 'clsx';

import ImageLoader from '../image/ImageLoader';

type ChallengeCategoryProps = {
  challengeId: number;
  imgUrl: string;
  title: string;
  selected: boolean;
  onClick: (challengeId: number) => void;
};

export const ChallengeCategory = ({
  challengeId,
  imgUrl,
  title,
  selected,
  onClick,
}: ChallengeCategoryProps) => {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 px-2"
      onClick={() => onClick(challengeId)}
    >
      <div
        className={clsx(
          'relative h-10 w-10 overflow-hidden rounded-lg object-cover',
          selected &&
            'border-2 border-solid border-primary  shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
        )}
      >
        <ImageLoader src={imgUrl} alt="" fill sizes="(max-width: 600px) 10vw" />
      </div>
      <p
        className={clsx(
          'font-caption-medium-md w-12 truncate text-center',
          !selected && 'text-gray-50',
        )}
      >
        {title}
      </p>
    </button>
  );
};
