import { TChallengeFeed, TMyFeed } from '@/types/feed';

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

export const getKoreanDate = (date: string) => {
  if (date.includes('am')) {
    return date.replace('am', '오전');
  }
  if (date.includes('pm')) {
    return date.replace('pm', '오후');
  }
  return '';
};
