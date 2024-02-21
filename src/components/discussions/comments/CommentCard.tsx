import React, { useRef, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import type { Comment } from '@types';

import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { useHasPermissions } from '@hooks/useHasPermissions';

import CommentBody from './CommentBody';
import CommentInput from './CommentInput';
import CommentProfile from './CommentProfile';
import InteractionsBox from './InteractionsBox';
import LoadMoreComments from './LoadMoreComments';
import SecondaryComment from './SecondaryComment';
import CardFrame from '@freya/components/ui/frames/CardFrame';
import ReactionsCounter from '@freya/components/reactions/ReactionsCounter';
import Can from '@components/can/Can';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = (props: CommentCardProps) => {
  const { comment } = props;

  const commentInputRef = useRef<HTMLInputElement>(null);

  const { width } = useWindowDimensions();

  const { hasPermissions } = useHasPermissions();

  const [editModeOn, setEditModeOn] = useState(false);

  const {
    pin_order_id,
    id,
    children = [],
    comment: commentText,
    children_count = 0,
    reactions,
    is_anonymous,
    children_cursors
  } = comment;
  const isPinned = pin_order_id !== 0;
  const hasMoreCommentsToShow = children_count > children.length;

  /* istanbul ignore next */
  const toggleEditMode = () => setEditModeOn((wasOn) => !wasOn);

  const scrollCommentInputToView = () => {
    if (commentInputRef?.current?.scrollIntoView) {
      commentInputRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  };

  return (
    <CardFrame
      className={`mb-28 p-20 p-sm-28 ${isPinned && 'border-5 border-start border-primary-400'}`}>
      <CommentProfile toggleEditMode={toggleEditMode} comment={comment} />
      <CommentBody
        commentId={id}
        editModeOn={editModeOn}
        commentText={commentText}
        toggleEditMode={toggleEditMode}
        isAnonymousDefault={is_anonymous}
        links={comment?.links}
        attachments={comment?.attachments}
      />
      <ReactionsCounter commentsCount={children_count} reactions={reactions} />
      <InteractionsBox
        comment={comment}
        screenWidth={width}
        onCommentClick={scrollCommentInputToView}
      />
      {hasMoreCommentsToShow && children_cursors?.prev && (
        <div className="text-center">
          <LoadMoreComments parentCommentId={id} direction="prev" />
        </div>
      )}
      {map(children, (comment) => (
        <SecondaryComment key={comment.id} comment={comment} parentCommentId={id} />
      ))}
      {hasMoreCommentsToShow && children_cursors?.next && (
        <div className="text-center">
          <LoadMoreComments parentCommentId={id} />
        </div>
      )}
      {!isEmpty(children) && hasPermissions(['create_comment']) && (
        <div className="width-100 border-bottom border border-1 border-gray-200 mb-20" />
      )}
      <Can permissions={['create_comment']}>
        {<CommentInput parentId={id} pinOrderId={pin_order_id} ref={commentInputRef} />}
      </Can>
    </CardFrame>
  );
};

export default CommentCard;
