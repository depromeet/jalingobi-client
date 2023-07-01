import { CommentInfoType } from '@/shared/types/feed';

import { Comment } from './Comment';

export const CommentContainer = ({
  comments,
}: {
  comments: CommentInfoType[];
}) => {
  return (
    <div className="px-5">
      {comments.map((commentInfo) => {
        return <Comment key={commentInfo.commentId} {...commentInfo} />;
      })}
    </div>
  );
};
