import { Spacing } from '@/shared/components';
import { DateChip } from '@/shared/components/date-chip';
import { isFeedDateDifferent } from '@/shared/utils/date/date';

import { MyFeedProps } from './MyFeed';
import { OthersFeedProps } from './OthersFeed';

type FeedDateProps = {
  currentFeed: MyFeedProps | OthersFeedProps;
  nextFeed: MyFeedProps | OthersFeedProps;
};

export const FeedDate = ({ currentFeed, nextFeed }: FeedDateProps) => {
  return isFeedDateDifferent({
    currentFeed,
    nextFeed,
  }) ? (
    <DateChip date={currentFeed.recordDate} />
  ) : (
    <Spacing height={32} />
  );
};
