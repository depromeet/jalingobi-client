import dayjs from 'dayjs';

interface DateChipProps {
  date: string;
}

export default function DateChip({ date }: DateChipProps) {
  const convertedDate = dayjs(date).format('YYYY년 M월 DD일');

  return (
    <div className="flex items-center justify-center py-6">
      <p className="font-caption-medium-md rounded-xl bg-gray-30 px-[2.188rem] py-[0.188rem] text-gray-60">
        {convertedDate}
      </p>
    </div>
  );
}
