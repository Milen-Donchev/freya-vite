import React from 'react';
import classNames from 'classnames';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from '@hooks/useTranslation';

import { useComments } from '@providers/CommentsProvider';

import HierarchyBorder from './HierarchyBorder';

import { tertiaryCommentsPreview } from './comments.scss';

interface TertiaryCommentsPreviewProps {
  commentsCount: number;
  parentCommentId: number;
  isInputFieldVisible?: boolean;
  isInitialRequest?: boolean;
}

const TertiaryCommentsPreview = (props: TertiaryCommentsPreviewProps) => {
  const {
    commentsCount,
    parentCommentId,
    isInputFieldVisible = false,
    isInitialRequest = true
  } = props;

  const { t } = useTranslation();
  const { loadChildren, loadMoreComments, isLoadingChildren, childrenRequestArgs } = useComments();

  const childrenRequestParentId = childrenRequestArgs?.id;

  const handleClick = () => {
    isInitialRequest ? loadChildren(parentCommentId) : loadMoreComments(parentCommentId);
  };

  return (
    <div
      className={classNames('d-flex', 'position-relative', {
        'mb-40': !isInputFieldVisible
      })}>
      <HierarchyBorder
        addBottomConnection={isInputFieldVisible}
        bottomConnectionClassName={isInputFieldVisible ? ' pb-40' : ''}
        topConnectionClassName="height-25 pb-20"
      />
      <div
        data-testid="tertiary-comments-preview"
        onClick={handleClick}
        className={`d-flex align-items-center position-absolute bg-white cursor-pointer ${tertiaryCommentsPreview}`}>
        <div className="ps-8 height-50 z-3">&nbsp;</div>
        {isLoadingChildren && childrenRequestParentId === parentCommentId ? (
          <Spinner variant="primary" animation="border" />
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
              {commentsCount === 1
                ? t('comment.single_reply', '1 reply')
                : `${commentsCount} ${t('comment.multiple_replies', 'replies')}`}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TertiaryCommentsPreview;
