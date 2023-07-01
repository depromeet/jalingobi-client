import { CommentInfoType } from '@/shared/types/feed';

import { Comment } from './Comment';

export const CommentContainer = ({
  comments,
  onClickDelete,
}: {
  comments: CommentInfoType[];
  onClickDelete: (commentId: number) => void;
}) => {
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
