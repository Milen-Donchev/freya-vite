import React from 'react';
import classNames from 'classnames';
import { Spinner } from 'react-bootstrap';

import { useTranslation } from '@hooks/useTranslation';
import { useComments } from '@providers/CommentsProvider';

import HierarchyBorder from './HierarchyBorder';

import { tertiaryCommentsPreview } from './comments.scss';

interface TertiaryCommentsLoadMoreProps {
  parentCommentId: number;
  isInputFieldVisible?: boolean;
  direction?: 'next' | 'prev';
}

const TertiaryCommentsLoadMore = (props: TertiaryCommentsLoadMoreProps) => {
  const { parentCommentId, isInputFieldVisible = false, direction = 'next' } = props;

  const { t } = useTranslation();
  const { loadMoreComments, isLoadingChildren, childrenRequestArgs } = useComments();

  const childrenRequestParentId = childrenRequestArgs?.id;

  const handleClick = () => loadMoreComments(parentCommentId, direction);

  return (
    <div
      className={classNames('d-flex', 'position-relative', {
        'mb-40': direction !== 'prev' && !isInputFieldVisible
      })}>
      <HierarchyBorder
        addBottomConnection={direction === 'prev' || isInputFieldVisible}
        bottomConnectionClassName={isInputFieldVisible || direction === 'prev' ? ' pb-40' : ''}
        topConnectionClassName="height-25 pb-20"
      />
      <div
        data-testid="tertiary-comments-preview"
        onClick={handleClick}
        className={`d-flex align-items-center position-absolute bg-white cursor-pointer ${tertiaryCommentsPreview}`}>
        <div className="ps-8 height-50 z-3">&nbsp;</div>
        {isLoadingChildren && childrenRequestParentId === parentCommentId ? (
          <Spinner variant="primary" animation="border" data-testid="spinner" />
        ) : (
          <>
            <div
              className={classNames(
                'width-4',
                'height-4',
                'me-8',
                'rounded-circle',
                'd-flex',
                'justify-content-center',
                'align-items-center',
                'bg-gray-100'
              )}>
              <i className="fa-light fa-comment text-primary" />
            </div>
            <div>
              {direction === 'next'
                ? t('comment.show_more_replies', 'Show more replies')
                : t('comment.show_previous_replies', 'Show previous replies')}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TertiaryCommentsLoadMore;
