import { Spacing } from '@/shared/components';
import { DateChip } from '@/shared/components/date-chip';
import { ChallengeFeedType, MyFeedType } from '@/shared/types/feed';
import { isFeedDateDifferent } from '@/shared/utils/date/date';

type FeedDateProps = {
  currentFeed: MyFeedType | ChallengeFeedType;
  nextFeed: MyFeedType | ChallengeFeedType;
};

export const FeedDate = ({ currentFeed, nextFeed }: FeedDateProps) => {
  return isFeedDateDifferent({
    currentFeed,
    nextFeed,
  }) ? (
    <DateChip date={currentFeed.recordInfo.date} />
  ) : (
    <Spacing height={32} />
  );
};
