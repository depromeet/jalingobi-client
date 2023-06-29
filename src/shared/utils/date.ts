import dayjs from 'dayjs';

import { ChallengeFeedType, MyFeedType } from '@/shared/types/feed';

export const isFeedDateDifferent = ({
  currentFeed,
  nextFeed,
}: {
  currentFeed: MyFeedType | ChallengeFeedType;
  nextFeed: MyFeedType | ChallengeFeedType;
}) => {
  if (!nextFeed) return true; // if there is no next feed, show the DateChip

  const currentDate = new Date(currentFeed.recordInfo.date).setHours(
    0,
    0,
    0,
    0,
  );
  const nextDate = new Date(nextFeed.recordInfo.date).setHours(0, 0, 0, 0);

  return currentDate !== nextDate; // return true if the dates are different
};

export const getKoreanDate = (date: string) => {
  if (date.includes('am')) {
    return date.replace('am', '오전');
  }
  if (date.includes('pm')) {
    return date.replace('pm', '오후');
  }
  return '';
};

export const timeDifference = (date1: string, date2: Date) => {
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
};
