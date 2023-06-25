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
