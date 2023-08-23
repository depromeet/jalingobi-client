type FeedCreationDateProps = { date: string };

export const FeedCreationDate = ({ date }: FeedCreationDateProps) => (
  <p className="font-caption-medium-sm text-gray-50">{date}</p>
);
