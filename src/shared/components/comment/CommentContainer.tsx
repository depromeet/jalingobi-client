import { CommentInfoType } from '@/shared/types/feed';

import { Comment } from './Comment';

export const CommentContainer = ({
  comments,
  onClickDelete,
}: {
  comments: CommentInfoType[];
  onClickDelete: (commentId: number) => void;
}) => {
  if (comments.length === 0) {
    return (
      <div className="font-body-regular-sm flex flex-col items-center justify-center py-20 text-gray-50">
        <p>이 소비내역, 거지가 아닌 것 같다면 ?</p>
        <p>코멘트로 회초리를 들어줍시다.</p>
      </div>
    );
  }

  return (
    <div className="px-5">
      {comments.map((commentInfo) => {
        return (
          <Comment
            key={commentInfo.commentId}
            commentInfo={commentInfo}
            onClickDelete={onClickDelete}
          />
        );
      })}
    </div>
  );
};
