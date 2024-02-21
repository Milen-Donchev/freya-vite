import React, { useState } from 'react';

import type { Comment } from '@types';

import CommentBody from './CommentBody';
import CommentProfile from './CommentProfile';
import HierarchyBorder from './HierarchyBorder';
import SecondaryCommentInteractions from './SecondaryCommentInteractions';

interface TertiaryCommentProps {
  comment: Comment;
  parentCommentId: number;
  onComment: (user: string) => void;
  isLastComment?: boolean;
}

const TertiaryComment = (props: TertiaryCommentProps) => {
  const { comment, parentCommentId, onComment, isLastComment = false } = props;

  const { comment: commentText, is_anonymous, attachments } = comment;

  const [editModeOn, setEditModeOn] = useState(false);

  /* istanbul ignore next */
  const toggleEditMode = () => setEditModeOn((wasOn) => !wasOn);

  return (
    <>
      <div className="d-flex">
        {/* Angled border showing comments hierarchy */}
        <HierarchyBorder addBottomConnection={!isLastComment} />

        {/* Comment box */}
        <div className="width-100 position-relative">
          <div className="p-20 bg-gray-100 rounded-3">
            <CommentProfile
              toggleEditMode={toggleEditMode}
              comment={comment}
              parentCommentId={parentCommentId}
            />
            <CommentBody
              commentId={comment.id}
              editModeOn={editModeOn}
              commentText={commentText}
              toggleEditMode={toggleEditMode}
              isAnonymousDefault={is_anonymous}
              links={comment?.links}
              attachments={attachments}
            />
          </div>
        </div>
      </div>
      {/* Interactions under comment box */}
      <SecondaryCommentInteractions
        onComment={onComment}
        comment={comment}
        showBorder={!isLastComment}
        isTertiaryComment={true}
      />
    </>
  );
};

export default TertiaryComment;
