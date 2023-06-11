import Image from 'next/image';

import dayjs from 'dayjs';

import { IconChevronRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { convertNumberToCurrency } from '@/shared/utils/currency';

interface MyFeedProps {
  recordId: number;
  title: string;
  price: number;
  content: string;
  recordDate: string;
  challengeImgUrl: string;
  challengeTitle: string;
  recordImgUrl?: string;
  onClickFeed: (recordId: number) => void;
}

const MyFeed = ({
  recordId,
  title,
  price,
  content,
  recordDate,
  challengeImgUrl,
  challengeTitle,
  recordImgUrl,
  onClickFeed,
}: MyFeedProps) => {
  const convertedDate = dayjs(recordDate).format('a hh:mm');
  const convertedPrice = convertNumberToCurrency({
    value: price,
    unitOfCurrency: '원',
  });

  const getKoreanDate = (date: string) => {
    if (date.includes('am')) {
      return date.replace('am', '오전');
    }
    if (date.includes('pm')) {
      return date.replace('pm', '오후');
    }
    return '';
  };

  return (
    <div>
      <div className="flex justify-end">
        <div>
          {recordImgUrl && (
            <>
              <div
                className="relative h-[9.125rem] w-[13.75rem] overflow-hidden rounded-md"
                onClick={() => onClickFeed(recordId)}
              >
                <Image
                  src={recordImgUrl}
                  alt="피드 이미지"
                  fill
                  className="object-none"
                />
              </div>
              <Spacing height={6} />
            </>
          )}
          <div className="relative">
            <div
              className="w-[13.75rem] rounded-md bg-white p-2.5"
              onClick={() => onClickFeed(recordId)}
            >
              <div className="font-body-regular-sm flex items-center justify-between text-gray-70">
                <div>
                  <p className="w-[6.75rem] truncate">{title}</p>
                </div>
                <div className="flex items-center gap-1.5 ">
                  <p>{convertedPrice}</p>
                  <IconChevronRight className="h-2 w-1 fill-none" />
                </div>
              </div>
              <p className="font-caption-medium-md truncate text-gray-50">
                {content}
              </p>
              <Spacing height={5} />
              <div className="flex gap-[5px]">
                <div className="relative h-[1.125rem] w-[1.125rem]">
                  <Image src={challengeImgUrl} alt="" fill className="" />
                </div>
                <p className="font-caption-medium-md w-44 truncate text-gray-60">
                  {challengeTitle}
                </p>
              </div>
            </div>
            <p className="font-caption-medium-sm absolute bottom-0 left-[-3.25rem] text-gray-50">
              {getKoreanDate(convertedDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MyFeed };
