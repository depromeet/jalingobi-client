import Image from 'next/image';

import { IconOverflow } from '@/public/svgs';
import { CommentInfoType } from '@/shared/types/feed';
import { timeDifference } from '@/shared/utils/date';

export const Comment = (commentInfo: CommentInfoType) => {
  const { imgUrl, nickname, content, commentDate } = commentInfo;

  return (
    <div className="flex justify-between pb-1.5">
      <div className="flex gap-2.5">
        <div className="relative h-10 w-10 object-cover">
          <Image
            src={imgUrl}
            alt=""
            fill
            className="rounded-2.5 shrink-1"
            sizes="(max-width: 600px) 10vw"
          />
        </div>
        <div>
          <p className="font-body-regular-sm text-black">{nickname}</p>
          <p className="font-body-regular-sm text-gray-60">{content}</p>
          <p className="font-caption-medium-md text-gray-50">
            {timeDifference('2023-06-24T14:37:47.323', new Date())}
          </p>
        </div>
      </div>
      <IconOverflow />
    </div>
  );
};
