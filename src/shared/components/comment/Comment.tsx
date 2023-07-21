import Image from 'next/image';
import { useState } from 'react';

import { IconOverflow } from '@/public/svgs';
import { CommentInfoType } from '@/shared/types/feed';
import { timeDifference } from '@/shared/utils/date/date';

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../sheet';
import Spacing from '../spacing';

export const Comment = ({
  commentInfo,
  onClickDelete,
}: {
  commentInfo: CommentInfoType;
  onClickDelete: (commentId: number) => void;
}) => {
  const { imgUrl, nickname, content, commentDate, isMine, commentId } =
    commentInfo;

  return (
    <div className="flex justify-between pb-1.5">
      <div className="flex gap-2.5">
        <div className="relative h-10 w-10 object-cover">
          <Image
            src={imgUrl}
            alt=""
            fill
            className="rounded-2.5 shrink-1"
            sizes="(max-width: 600px) 10vw"
          />
        </div>
        <div>
          <p className="font-body-regular-sm text-black">{nickname}</p>
          <p className="font-body-regular-sm text-gray-60">{content}</p>
          <p className="font-caption-medium-md text-gray-50">
            {timeDifference(commentDate, new Date())}
          </p>
        </div>
      </div>
      {isMine && (
        <BottomSheet commentId={commentId} onClickDelete={onClickDelete} />
      )}
    </div>
  );
};

function BottomSheet({
  commentId,
  onClickDelete,
}: {
  commentId: number;
  onClickDelete: (commentId: number) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickDelete = (commentId: number) => {
    setIsOpen(false);
    onClickDelete(commentId);
  };

  return (
    <div className="relative">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button type="button">
            <IconOverflow />
          </button>
        </SheetTrigger>
        <SheetContent
          position="bottom"
          size="content"
          className="rounded-t-2xl bg-white"
        >
          <SheetHeader>
            <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-xl bg-gray-30" />
          </SheetHeader>
          <Spacing height={20} />
          <button
            type="button"
            className="font-body-regular-lg flex w-full px-3 py-2.5 text-gray-70"
            onClick={() => handleClickDelete(commentId)}
          >
            댓글 삭제
          </button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
