import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';

import { useAddComment, useDeleteComment } from '@/features/comment/queries';
import { useChallengeDetail } from '@/features/feed/queries';
import { IconArrowLeft, IconArrowUpFill, IconCrazyBig } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { CommentContainer } from '@/shared/components/comment/CommentContainer';
import { ExpenseDetailsEmojiContainer } from '@/shared/components/emoji/ExpenseDetailsEmojiContainer';
import { PageLoading } from '@/shared/components/loading';
import { TextInput } from '@/shared/components/text-input';
import { useToast } from '@/shared/hooks/useToast';
import {
  CommentInfoType,
  RecordInfoType,
  UserInfoType,
} from '@/shared/types/feed';
import { convertNumberToCurrency } from '@/shared/utils/currency';
import { getKoreanDate } from '@/shared/utils/date';

export default function ExpenseDetails() {
  const router = useRouter();

  const { challengeId, recordId } = router.query;

  const { data, isLoading, isError } = useChallengeDetail({
    challengeId: Number(challengeId),
    recordId: Number(recordId),
  });

  const {
    data: addCommentResponse,
    mutateAsync: addComment,
    isError: addCommentError,
  } = useAddComment();
  const {
    data: deleteCommentResponse,
    mutateAsync: deleteComment,
    isError: deleteCommentError,
  } = useDeleteComment();

  const { setToastMessage } = useToast();

  const [comments, setComments] = useState<CommentInfoType[]>([]);
  const [prevComments, setPrevComments] = useState<CommentInfoType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const addCommentCommonLogic = async () => {
    setPrevComments(comments);

    await addComment({
      recordId: Number(recordId),
      content: inputValue,
    });
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key !== 'Enter' ||
      inputValue.length === 0 ||
      e.nativeEvent.isComposing // It is for korean onKeyDown / onKeyUp bug
    ) {
      return;
    }

    addCommentCommonLogic();
  };

  const handleClickIcon = () => {
    if (inputValue.length === 0) {
      return;
    }

    addCommentCommonLogic();
  };

  const handleClickDelete = (commentId: number) => {
    setPrevComments(comments);

    deleteComment({
      recordId: Number(recordId),
      commentId,
    });
  };

  useEffect(() => {
    if (!addCommentResponse) {
      return;
    }

    const addedComment = {
      isMine: true,
      commenterId: addCommentResponse.result.commenterId,
      nickname: addCommentResponse.result.nickname,
      imgUrl: addCommentResponse.result.imgUrl,
      commentId: addCommentResponse.result.id,
      content: inputValue,
      commentDate: addCommentResponse.result.commentDate,
    };

    setComments((prev) => [...prev, addedComment]);
    setInputValue('');
  }, [addCommentResponse]);

  useEffect(() => {
    if (!deleteCommentResponse) {
      return;
    }

    setComments((prev) =>
      prev.filter(
        (comment) =>
          comment.commentId !== deleteCommentResponse.result.commentId,
      ),
    );
  }, [deleteCommentResponse]);

  useEffect(() => {
    if (prevComments.length === 0 || prevComments.length >= comments.length) {
      return;
    }

    if (!bottomRef.current) {
      return;
    }

    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setComments(data.result.commentInfoList);
  }, [data]);

  useEffect(() => {
    if (!addCommentError) {
      return;
    }

    setToastMessage('댓글 등록에 실패하였습니다.');
  }, [addCommentError]);

  useEffect(() => {
    if (!deleteCommentError) {
      return;
    }

    setToastMessage('댓글 삭제에 실패하였습니다.');
  }, [deleteCommentError]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    router.push('/not-found');
    return null;
  }

  return (
    <section>
      <Header />
      <Contents
        userInfo={data.result.userInfo}
        recordInfo={data.result.recordInfo}
      />
      <Divider />
      <ExpenseDetailsEmojiContainer {...data.result.emojiInfo} />
      <Divider />
      <Spacing height={16} />
      <CommentContainer comments={comments} onClickDelete={handleClickDelete} />
      <Bottom
        inputValue={inputValue}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        onClickIcon={handleClickIcon}
      />
      <div ref={bottomRef} />
      <Spacing height={68} />
    </section>
  );
}

function Divider() {
  return <div className="border-t-[1px] border-gray-20" />;
}

function Header() {
  const router = useRouter();

  const handleClickPrev = () => {
    router.back();
  };

  return (
    <header className="relative sticky top-0 z-10 flex items-center justify-center border-b-[1px] border-gray-20 bg-white px-5">
      <button
        type="button"
        className="absolute left-5 flex h-6 w-6 items-center justify-center"
        onClick={handleClickPrev}
      >
        <IconArrowLeft className="stroke-gray-50" />
      </button>
      <p className="font-title-medium-sm py-2.5 text-black">지출 내역</p>
    </header>
  );
}

function Contents({
  userInfo,
  recordInfo,
}: {
  userInfo: UserInfoType;
  recordInfo: RecordInfoType;
}) {
  const { date, price, imgUrl: recordImgUrl, title, content } = recordInfo;
  const { imgUrl: userImgUrl, nickname } = userInfo;

  const convertedRecordDate = dayjs(date).format('MM월 DD일 a hh:mm');
  const convertedPrice = convertNumberToCurrency({
    value: price || 0,
    unitOfCurrency: '원',
  });
  return (
    <div className="p-5">
      <div className="flex gap-2.5">
        <Image
          src={userImgUrl}
          alt=""
          width={40}
          height={40}
          className="rounded-2.5 shrink"
        />
        <div>
          <p className="font-caption-medium-lg text-black">{nickname}</p>
          <p className="font-caption-medium-md text-gray-50">
            {getKoreanDate(convertedRecordDate)}
          </p>
        </div>
      </div>
      {recordImgUrl && (
        <>
          <Spacing height={20} />
          <div className="relative h-[12.5rem] w-[21rem] overflow-hidden rounded-lg">
            <Image
              src={recordImgUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 600px) 60vw"
            />
          </div>
        </>
      )}
      <Spacing height={20} />
      <div className="flex justify-between">
        <div>
          <p className="font-caption-medium-lg text-gray-70">{title}</p>
          <p className="font-title-medium-md text-gray-70">{convertedPrice}</p>
          <Spacing height={10} />
          <p className="font-body-regular-sm line-clamp-3 w-72 text-gray-60">
            {content}
          </p>
        </div>
        <IconCrazyBig className="h-10 w-10" />
      </div>
      <Spacing height={20} />
    </div>
  );
}

function Bottom({
  inputValue,
  onChange,
  onKeyDown,
  onClickIcon,
}: {
  inputValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClickIcon: () => void;
}) {
  return (
    <div className="fixed bottom-0 w-full ">
      <Divider />
      <div className="bg-white px-5 py-3">
        <TextInput
          className="w-full"
          placeholder="눌러서 댓글을 남겨보세요."
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputValue}
          rightSection={
            <button type="button" onClick={onClickIcon}>
              <IconArrowUpFill />
            </button>
          }
        />
      </div>
    </div>
  );
}
