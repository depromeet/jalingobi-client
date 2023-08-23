import { Spacing } from '@/shared/components';
import { DateChip } from '@/shared/components/date-chip';
import { isFeedDateDifferent } from '@/shared/utils/date/date';

type FeedDateProps = {
  currentFeedDate: string;
  nextFeedDate: string;
};

export const FeedDate = ({ currentFeedDate, nextFeedDate }: FeedDateProps) => {
  return isFeedDateDifferent({
    currentFeedDate,
    nextFeedDate,
  }) ? (
    <DateChip date={currentFeedDate} />
  ) : (
    <Spacing height={32} />
  );
};
