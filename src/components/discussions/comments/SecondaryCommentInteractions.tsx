import React from 'react';
import classNames from 'classnames';
import { useTranslation } from '@hooks/useTranslation';

import type { Comment } from '@types';

import { Breakpoints } from '@models/Breakpoints';
import { useComments } from '@providers/CommentsProvider';
import { useGetCurrentUserQuery } from '@store/api/userApi';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import Can from '@components/can/Can';

interface SecondaryCommentInteractionsProps {
  comment: Comment;
  onComment: (user: string) => void;
  showBorder?: boolean;
  isTertiaryComment?: boolean;
}

const SecondaryCommentInteractions = (props: SecondaryCommentInteractionsProps) => {
  const { comment, showBorder = true, onComment, isTertiaryComment = false } = props;

  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const { reactToComment } = useComments();
  const { data: user } = useGetCurrentUserQuery({});

  const alreadyReacted = !!comment?.reactions?.find(
    (reaction) => reaction.profile.id === user?.data?.id
  );
  const reactionsCount = comment?.reactions?.length ?? 0;

  return (
    <div
      className={classNames(
        'ps-0',
        'ps-sm-20',
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'pt-8',
        'pb-16',
        {
          'ps-sm-20': !isTertiaryComment,
          'ps-sm-40': isTertiaryComment,
          'border-2 border-start border-gray-200': showBorder
        }
      )}>
      <div className="d-flex align-items-center">
        <Can permissions={['react_to_comment']}>
          <button
            data-testid="secondary-interactions-reaction-button"
            onClick={() => reactToComment(comment.id, 'like')}
            className={classNames('btn', 'btn-ghost-primary', {
              'btn-sm': width <= Breakpoints.SM
            })}>
            <i className={`fa-${alreadyReacted ? 'solid' : 'light'} fa-heart me-8`} />
            {alreadyReacted ? t('comment.liked', 'Liked') : t('comment.like', 'Like')}
          </button>
        </Can>
        <Can permissions={['create_comment']}>
          <button
            data-testid="secondary-interactions-comment-button"
            onClick={() => onComment(comment?.profile?.title)}
            className={classNames('btn', 'btn-ghost-primary', {
              'btn-sm': width <= Breakpoints.SM
            })}>
            <i className="fa-light fa-comment me-8" />
            {t('comment.comment', 'Comment')}
          </button>
        </Can>
      </div>
      <div className="d-flex align-items-center">
        {reactionsCount > 0 && (
          <>
            <div className="fs-14 text-primary me-4">{reactionsCount}</div>
            <div className="d-flex justify-content-center align-items-center rounded-circle width-2 height-2 bg-primary">
              <i className="fa-solid fa-heart text-white fs-10" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SecondaryCommentInteractions;
