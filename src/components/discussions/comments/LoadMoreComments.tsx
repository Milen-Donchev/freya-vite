import React from 'react';

import { useTranslation } from '@hooks/useTranslation';
import { useComments } from '@providers/CommentsProvider';
import LoadingButton from '@freya/components/ui/buttons/LoadingButton';

interface LoadMoreCommentsProps {
  parentCommentId?: number;
  direction?: 'next' | 'prev';
}

const LoadMoreComments = (props: LoadMoreCommentsProps) => {
  const { parentCommentId, direction = 'next' } = props;

  const { t } = useTranslation();
  const { loadMoreComments, isLoading, isLoadingChildren, childrenRequestArgs } = useComments();

  const requestParentId = childrenRequestArgs?.id;

  const hasLoadingState =
    (isLoading && !parentCommentId && direction === 'next') ||
    (isLoadingChildren && requestParentId === parentCommentId);

  const handleLoadMoreComments = () => {
    loadMoreComments(parentCommentId, direction);
  };

  return (
    <LoadingButton
      loading={hasLoadingState}
      disabled={isLoading || isLoadingChildren}
      onClick={handleLoadMoreComments}
      className="btn btn-outline-primary mb-20"
      data-testid="load-more-comments">
      {direction === 'next'
        ? t('comment.show_more_comments', 'Show more comments')
        : t('comment.show_previous_comments', 'Show previous comments')}
    </LoadingButton>
  );
};

export default LoadMoreComments;
