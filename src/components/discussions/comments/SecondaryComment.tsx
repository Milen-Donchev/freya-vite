import map from 'lodash/map';
import last from 'lodash/last';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';

import type { Comment } from '@types';

import { useQueryParams } from '@hooks/useQueryParams';
import { useTranslation } from '@hooks/useTranslation';
import { useComments } from '@providers/CommentsProvider';

import CommentBody from './CommentBody';
import CommentProfile from './CommentProfile';
import TertiaryComment from './TertiaryComment';
import SubcommentInput from './SubcommentInput';
import TertiaryCommentsPreview from './TertiaryCommentsPreview';
import SecondaryCommentInteractions from './SecondaryCommentInteractions';
import Can from '@components/can/Can';
import TertiaryCommentsLoadMore from './TertiaryCommentsLoadMore';

interface SecondaryCommentProps {
  comment: Comment;
  parentCommentId: number;
}

const SecondaryComment = (props: SecondaryCommentProps) => {
  const { comment, parentCommentId } = props;

  const {
    comment: commentText,
    children = [],
    children_count = 0,
    id,
    is_anonymous,
    children_cursors,
    attachments
  } = comment;
  const hasSubcomments = children_count !== 0;
  const canLoadMore = children_count > children?.length;

  const { t } = useTranslation();

  const { getParam } = useQueryParams();
  const hasAnchor = !!getParam('ANCHOR_COMMENT_ID');

  const [inputTaggedUser, setInputTaggedUser] = useState<string | null>(null);
  const [editModeOn, setEditModeOn] = useState(false);

  const { loadChildren } = useComments();

  /* istanbul ignore next */
  const tagUserInInputField = (user?: string) =>
    setInputTaggedUser(user ?? t('common.anonymous', 'Anonymous'));
  /* istanbul ignore next */
  const toggleEditMode = () => setEditModeOn((wasOn) => !wasOn);

  const onCommentClick = (user: string) => {
    tagUserInInputField(user);
    if (hasSubcomments && isEmpty(children)) {
      loadChildren(id);
    }
  };

  return (
    <div>
      <div
        className={`p-20 bg-gray-100 rounded-top-3 rounded-end-3 ${
          !hasSubcomments && !inputTaggedUser && 'rounded-bottom-3'
        }`}>
        <CommentProfile
          toggleEditMode={toggleEditMode}
          comment={comment}
          parentCommentId={parentCommentId}
        />
        <CommentBody
          commentId={id}
          editModeOn={editModeOn}
          commentText={commentText}
          toggleEditMode={toggleEditMode}
          isAnonymousDefault={is_anonymous}
          links={comment?.links}
          attachments={attachments}
        />
      </div>
      <SecondaryCommentInteractions
        onComment={onCommentClick}
        comment={comment}
        showBorder={hasSubcomments || !!inputTaggedUser}
      />
      {hasSubcomments && canLoadMore && children_cursors?.prev && hasAnchor && (
        <TertiaryCommentsLoadMore parentCommentId={id} direction="prev" />
      )}
      {hasSubcomments &&
        !isEmpty(children) &&
        map(children, (comment) => (
          <TertiaryComment
            key={comment.id}
            comment={comment}
            parentCommentId={id}
            onComment={onCommentClick}
            isLastComment={comment.id === last(children)?.id && !inputTaggedUser && !canLoadMore}
          />
        ))}
      {hasSubcomments && canLoadMore && ((hasAnchor && isEmpty(children)) || !hasAnchor) && (
        <TertiaryCommentsPreview
          isInputFieldVisible={!!inputTaggedUser}
          commentsCount={children_count - children.length}
          parentCommentId={id}
          isInitialRequest={children.length === 0}
        />
      )}
      {hasSubcomments && canLoadMore && children_cursors?.next && hasAnchor && (
        <TertiaryCommentsLoadMore parentCommentId={id} isInputFieldVisible={!!inputTaggedUser} />
      )}
      <Can permissions={['create_comment']}>
        {inputTaggedUser && <SubcommentInput taggedUser={inputTaggedUser} parentCommentId={id} />}
      </Can>
    </div>
  );
};

export default SecondaryComment;
