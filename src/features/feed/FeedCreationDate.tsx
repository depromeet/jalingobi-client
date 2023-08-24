import { cn } from '@/lib/utils';

type FeedCreationDateProps = { date: string; className?: string };

export const FeedCreationDate = ({
  date,
  className,
}: FeedCreationDateProps) => (
  <p className={cn('font-caption-medium-sm text-gray-50', className)}>{date}</p>
);
