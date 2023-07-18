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

export const calculateDaysBetween = (
  startAt?: string,
  endAt?: string,
): number => {
  if (!startAt || !endAt) return 0;
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    Math.abs((startDate.getTime() - endDate.getTime()) / oneDay),
  );
  return diffDays;
};

export const getDayOfWeek = (dateStr?: string): string => {
  if (!dateStr) return '';
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateStr);
  const dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
};

export const isActiveChallenge = ({
  startAt,
  endAt,
}: {
  startAt: string;
  endAt: string;
}) => {
  if (!startAt || !endAt) return false;
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);
  const today = new Date();
  return startDate <= today && endDate >= today;
};
