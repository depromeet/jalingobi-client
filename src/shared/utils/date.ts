import { TChallengeFeed, TMyFeed } from '@/shared/types/feed';

export const isFeedDateDifferent = ({
  currentFeed,
  nextFeed,
}: {
  currentFeed: TMyFeed | TChallengeFeed;
  nextFeed: TMyFeed | TChallengeFeed;
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
