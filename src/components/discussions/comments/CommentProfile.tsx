import React from 'react';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import type { Comment } from '@types';

import { useTranslation } from '@hooks/useTranslation';
import { QueryParams } from '@models/QueryParams';
import { formatDateTime } from '@utils/dateHelpers';
import { useComments } from '@providers/CommentsProvider';
import { useDiscussion } from '@providers/DiscussionProvider';
import { checkIsDiscussionAdmin } from '@utils/discussions';

import Can from '@components/can/Can';
import UserInfoRow from '@components/user/UserInfoRow';

interface CommentProfileProps {
  comment: Comment;
  toggleEditMode: () => void;
  parentCommentId?: number;
}

const CommentProfile = (props: CommentProfileProps) => {
  const {
    comment: {
      id,
      profile,
      created_at,
      pin_order_id,
      depth,
      is_anonymous,
      profile_id,
      is_from_admin
    },
    toggleEditMode,
    parentCommentId
  } = props;

  const { t } = useTranslation();
  const user = useSelector((store: any) => store.currentUserSlice.currentUser);

  const { deleteComment, pinComment } = useComments();
  const { discussion } = useDiscussion();
  const navigate = useNavigate();

  const date = formatDateTime(created_at);
  const isPinned = pin_order_id !== 0;
  const isMainComment = depth === 0;
  const allCommentsAnonymized = discussion?.all_comments_anonymized;
  const isCurrentUserComment = user?.id === profile_id;
  const participantType = get(discussion, 'participant.type', '');
  const isDiscussionAdmin = checkIsDiscussionAdmin(participantType);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      window.location.href.split('?')[0] + `?${QueryParams.ANCHOR_COMMENT_ID}=${id}`
    );
  };
  const handleParticipantClick = () => {
    isDiscussionAdmin && navigate(`/profile/${profile_id}/${profile?.slug}`);
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      {/* COMMENT AUTHOR PROFILE */}
      <div
        className={isDiscussionAdmin ? 'cursor-pointer' : ''}
        onClick={handleParticipantClick}
        key={id}>
        <UserInfoRow
          name={profile?.title}
          image={profile?.image?.source}
          subtext={date}
          subtextClassName="fs-12 text-gray-300"
          isAnonymous={is_anonymous}
          showInitials={allCommentsAnonymized && !is_anonymous && !is_from_admin}
        />
      </div>

      {/* COMMENT RIGHT SIDE OPTIONS */}
      <div className="d-flex align-items-center">
        {isPinned && isMainComment && <i className="fa-light fa-thumbtack text-primary me-8" />}
        <Dropdown className="dropdown d-inline-block">
          <Dropdown.Toggle
            as="button"
            data-testid="dropdown-toggle"
            id="dropdown-basic"
            className="btn btn-icon btn-lg btn-ghost-primary dropdownToggle">
            <i className="fa-regular fa-ellipsis-vertical fs-22" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item onClick={handleCopyLink} className="dropdown-item">
              <i className="fa-light fa-link-simple me-12 text-primary" />
              {t('comment.dropdown_copy_link', 'Copy link')}
            </Dropdown.Item>
            {isCurrentUserComment && (
              <>
                <Can permissions={['update_comment']}>
                  <Dropdown.Item
                    data-testid="edit-comment-button"
                    onClick={toggleEditMode}
                    className="dropdown-item"
                    as="button">
                    <i className="fa-light fa-pen me-12 text-primary" />
                    {t('comment.dropdown_edit_comment', 'Edit comment')}
                  </Dropdown.Item>
                </Can>
                <Can permissions={['delete_comment']}>
                  <Dropdown.Item
                    data-testid="delete-comment-button"
                    onClick={() => deleteComment(id, parentCommentId)}
                    className="dropdown-item"
                    as="button">
                    <i className="fa-light fa-trash-can me-12 text-primary" />
                    {t('comment.dropdown_delete_comment', 'Delete comment')}
                  </Dropdown.Item>
                </Can>
              </>
            )}
            {isDiscussionAdmin && isMainComment && (
              <Can permissions={['pin_comment']}>
                <Dropdown.Item
                  data-testid="pin-dropdown-button"
                  className="dropdown-item"
                  onClick={() => pinComment(id)}>
                  <i className="fa-light fa-thumbtack me-12 text-primary" />
                  {isPinned
                    ? t('comment.dropdown_unpin_comment', 'Unpin comment')
                    : t('comment.dropdown_pin_comment', 'Pin comment')}
                </Dropdown.Item>
              </Can>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default CommentProfile;
