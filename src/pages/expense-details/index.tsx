import Image from 'next/image';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { useChallengeDetail } from '@/features/feed/queries';
import {
  IconArrowLeft,
  IconCrazyBig,
  IconRegretfulBig,
  IconWelldoneBig,
} from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { CommentContainer } from '@/shared/components/comment/CommentContainer';
import { TextInput } from '@/shared/components/text-input';
import { convertNumberToCurrency } from '@/shared/utils/currency';
import { getKoreanDate } from '@/shared/utils/date';

export default function ExpenseDetails() {
  const router = useRouter();

  const { challengeId, recordId } = router.query;

  const { data, isLoading, isError } = useChallengeDetail({
    challengeId: Number(challengeId),
    recordId: Number(recordId),
  });

  const convertedRecordDate = dayjs(data?.result.recordInfo.date).format(
    'MM월 DD일 a hh:mm',
  );
  const convertedPrice = convertNumberToCurrency({
    value: data?.result.recordInfo.price || 0,
    unitOfCurrency: '원',
  });

  const handleClickPrev = () => {
    router.back();
  };

  if (isLoading) {
    return <>...loading</>;
  }

  if (isError) {
    return <>error occured</>;
  }

  return (
    <section>
      <header className="relative sticky top-0 z-10 flex items-center justify-center border-b-[1px] border-gray-20 bg-white px-5">
        <button
          type="button"
          className="absolute left-5 flex h-6 w-6 items-center justify-center"
          onClick={handleClickPrev}
        >
          <IconArrowLeft />
        </button>
        <p className="font-title-medium-sm py-2.5 text-black">지출 내역</p>
      </header>
      <div className="p-5">
        <div className="flex gap-2.5">
          <Image
            src={data.result.userInfo.imgUrl}
            alt=""
            width={40}
            height={40}
            className="rounded-2.5 shrink"
          />
          <div>
            <p className="font-caption-medium-lg text-black">
              {data.result.userInfo.nickname}
            </p>
            <p className="font-caption-medium-md text-gray-50">
              {getKoreanDate(convertedRecordDate)}
            </p>
          </div>
        </div>
        <Spacing height={20} />
        <div className="relative h-[12.5rem] w-[21rem] overflow-hidden rounded-lg">
          <Image
            src={data.result.recordInfo.imgUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 600px) 60vw"
          />
        </div>
        <Spacing height={20} />
        <div className="flex justify-between">
          <div>
            <p className="font-caption-medium-lg text-gray-70">
              {data.result.recordInfo.title}
            </p>
            <p className="font-title-medium-md text-gray-70">
              {convertedPrice}
            </p>
            <Spacing height={10} />
            <p className="font-body-regular-sm line-clamp-3 w-72 text-gray-60">
              {data.result.recordInfo.content}
            </p>
          </div>
          <IconCrazyBig className="h-10 w-10" />
        </div>
        <Spacing height={20} />
      </div>
      <div className="border-t-[1px] border-gray-20" />
      <div className="flex justify-between px-6 py-4">
        <div className="flex">
          <IconCrazyBig className="h-10 w-10" />
          <div className="flex w-14 flex-col items-center">
            <p className="font-caption-medium-sm text-gray-60">미친거지</p>
            <p className="font-caption-medium-lg text-gray-70">
              {data.result.emojiInfo.CRAZY}
            </p>
          </div>
        </div>
        <div className="flex">
          <IconRegretfulBig className="h-10 w-10" />
          <div className="flex w-14 flex-col items-center">
            <p className="font-caption-medium-sm text-gray-60">후회할거지</p>
            <p className="font-caption-medium-lg text-gray-70">
              {data.result.emojiInfo.REGRETFUL}
            </p>
          </div>
        </div>
        <div className="flex">
          <IconWelldoneBig className="h-10 w-10" />
          <div className="flex w-14 flex-col items-center">
            <p className="font-caption-medium-sm text-gray-60">잘할거지</p>
            <p className="font-caption-medium-lg text-gray-70">
              {data.result.emojiInfo.WELLDONE}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-gray-20" />
      <Spacing height={16} />
      <CommentContainer comments={data.result.commentInfoList} />
      <div className="fixed bottom-0 w-full ">
        <div className="border-t-[1px] border-gray-20" />
        <div className="bg-white px-5 py-3">
          <TextInput
            className="w-full"
            placeholder="눌러서 댓글을 남겨보세요."
          />
        </div>
      </div>
      <Spacing height={68} />
    </section>
  );
}
