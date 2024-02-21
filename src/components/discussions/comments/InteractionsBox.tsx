import React from 'react';
import classNames from 'classnames';
import { useTranslation } from '@hooks/useTranslation';
import { useHasPermissions } from '@hooks/useHasPermissions';

import type { Comment } from '@types';

import { Breakpoints } from '@models/Breakpoints';
import { useComments } from '@providers/CommentsProvider';
import { useGetCurrentUserQuery } from '@store/api/userApi';

import Can from '@components/can/Can';

interface InteractionsBoxProps {
  comment: Comment;
  screenWidth: number;
  onCommentClick: () => void;
}

const InteractionsBox = (props: InteractionsBoxProps) => {
  const { comment, screenWidth, onCommentClick } = props;

  const { data: user } = useGetCurrentUserQuery({});
  const { t } = useTranslation();

  const alreadyReacted = !!comment?.reactions?.find(
    (reaction) => reaction.profile.id === user?.data?.id
  );

  const { reactToComment } = useComments();
  const { hasOneOfPermissions } = useHasPermissions();

  return (
    <>
      {hasOneOfPermissions(['react_to_comment', 'create_comment']) && (
        <div className="d-flex width-100 align-self-center justify-content-between border-gray-200 border-top border-1 mb-20 border-bottom py-4">
          <Can permissions={['react_to_comment']}>
            <button
              data-testid="interactions-reaction-button"
              onClick={() => reactToComment(comment.id, 'like')}
              className="btn btn-ghost-primary width-50">
              <i
                className={`fa-${alreadyReacted ? 'solid' : 'light'} fa-heart me-8 fs-16 fs-sm-20`}
              />
              {alreadyReacted ? t('comment.liked', 'Liked') : t('comment.like', 'Like')}
            </button>
          </Can>
          <Can permissions={['create_comment']}>
            <button
              data-testid="interactions-comment-button"
              onClick={onCommentClick}
              className="btn btn-ghost-primary width-50">
              <i className="fa-light fa-comment me-8 fs-16 fs-sm-20" />
              {t('comment.comment', 'Comment')}
            </button>
          </Can>
        </div>
      )}
    </>
  );
};

export default InteractionsBox;
