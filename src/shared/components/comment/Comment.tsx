import Image from 'next/image';

import dayjs from 'dayjs';

import { IconOverflow } from '@/public/svgs';
import { CommentInfoType } from '@/shared/types/feed';

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
            {timeDifference(commentDate, new Date())}
          </p>
        </div>
      </div>
      <IconOverflow />
    </div>
  );
};

function timeDifference(date1: string, date2: Date) {
  const diffMinutes = dayjs(date2).diff(date1, 'minute');
  const diffHours = dayjs(date2).diff(date1, 'hour');
  const diffDays = dayjs(date2).diff(date1, 'day');

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  if (diffDays <= 7) {
    return `${diffDays}일 전`;
  }
  return dayjs(date1).format('M월 DD일');
}
