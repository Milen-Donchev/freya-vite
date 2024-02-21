import React from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import Skeleton from 'react-loading-skeleton';

import { useQueryParams } from '@hooks/useQueryParams';
import { useComments } from '@providers/CommentsProvider';

import CommentCard from './CommentCard';
import CommentOrder from './CommentOrder';
import LoadMoreComments from './LoadMoreComments';

const DiscussionComments = () => {
  const { comments, mainCommentCursors, isLoading } = useComments();

  const { getParam } = useQueryParams();
  const hasAnchor = !!getParam('ANCHOR_COMMENT_ID');

  return (
    <div className="mb-28">
      {!hasAnchor && <CommentOrder />}
      {mainCommentCursors.prevCursor && hasAnchor && (
        <div className="text-center">
          <LoadMoreComments direction="prev" />
        </div>
      )}
      {isLoading && <DiscussionCommentsSkeleton />}
      {!isEmpty(comments) &&
        map(comments, (comment) => <CommentCard key={String(comment.id)} comment={comment} />)}
      {mainCommentCursors.nextCursor && (
        <div className="text-center">
          <LoadMoreComments />
        </div>
      )}
    </div>
  );
};

export default DiscussionComments;

const DiscussionCommentsSkeleton = () => (
  <>
    <div className="row mb-28">
      <Skeleton height={200} baseColor="white" borderRadius={12} />
    </div>
    <div className="row mb-28">
      <Skeleton height={200} baseColor="white" borderRadius={12} />
    </div>
  </>
);
