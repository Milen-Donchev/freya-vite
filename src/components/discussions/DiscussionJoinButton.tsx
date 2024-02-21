import React, { useState } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import { ParticipantStatus } from '@models/Discussion';
import { useDiscussion } from '@providers/DiscussionProvider';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { useTranslation } from '@hooks/useTranslation';
import { useAuthStatus } from '@hooks/useAuthStatus';
import {
  useJoinDiscussionMutation,
  useChangeDiscussionStatusMutation
} from '@store/api/discussionApi';
import LoadingButton from '@components/ui/buttons/LoadingButton';
import Can from '@components/can/Can';
import { toastMessage } from '@components/ui/toast-message/InlineMessage';
import DiscussionSubscribePopup from '@components/discussions/DiscussionSubscribePopup';
import AuthPopup from '@components/ui/popup/AuthPopup';

const DiscussionJoinButton = () => {
  const { t } = useTranslation();
  const translate = useTranslatedAttribute();
  const { discussion } = useDiscussion();
  const { isAuthenticated } = useAuthStatus();

  const [joinDiscussion, { isLoading: isLoadingJoinDiscussion }] = useJoinDiscussionMutation();
  const [changeDiscussionStatus, { isLoading: isLoadingChangeDiscussionStatus }] =
    useChangeDiscussionStatusMutation();

  const [isSubscriptionPopupOpen, setIsSubscriptionPopupOpen] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  const currentStatus = get(discussion, 'participant.status', '');
  const currentStatusLabel = get(discussion, 'participant.status_text.title_status');
  const currentStatusCTA = get(discussion, 'participant.status_text.cta_status');
  const participantId = get(discussion, 'participant.id', '');
  const openSubscriptionPopup = () => setIsSubscriptionPopupOpen(true);
  const closeSubscriptionPopup = () => setIsSubscriptionPopupOpen(false);
  const openAuthPopup = () => setIsAuthPopupOpen(true);
  const closeAuthPopup = () => setIsAuthPopupOpen(false);

  const handleJoinDiscussion = async () => {
    if (!discussion.id) return;

    if (discussion?.is_sellable) return openSubscriptionPopup();

    try {
      await joinDiscussion({
        entity_id: discussion.id
      }).unwrap();

      if (!get(discussion, 'requires_approval', false)) {
        toastMessage(
          t('discussion.joined_discussion_toast', 'You successfully joined the discussion.'),
          'success'
        );
      } else {
        toastMessage(t('discussion.status_pending_description', 'Pending description'), 'warning');
      }
    } catch (error: any) {}
  };

  const handleAcceptInvitation = async () => {
    if (!participantId) return;

    if (discussion?.is_sellable) return openSubscriptionPopup();

    try {
      await changeDiscussionStatus({
        profile_id: participantId,
        status: ParticipantStatus.JOINED
      }).unwrap();

      toastMessage(
        t('discussion.joined_discussion_toast', 'You successfully joined the discussion.'),
        'success'
      );
    } catch (error: any) {}
  };

  const handleGuestJoinDiscussion = () => {
    if (discussion?.is_sellable) return openSubscriptionPopup();
    openAuthPopup();
  };

  return (
    <>
      <div className="flex-fill">
        {isEqual(currentStatus, ParticipantStatus.JOINED) && (
          <p className="fw-semibold mb-0 text-primary">
            {currentStatusLabel && translate(currentStatusLabel)}
          </p>
        )}
        {isEqual(currentStatus, ParticipantStatus.PENDING) && (
          <div className="d-flex align-items-center text-primary">
            <i className="fa-light fa-hourglass-start fs-24 me-12"></i>
            <p className="fw-semibold mb-0">
              {currentStatusLabel && translate(currentStatusLabel)}
            </p>
          </div>
        )}
        {isEqual(currentStatus, ParticipantStatus.INVITED) && (
          <Can permissions={['update_participant']}>
            <LoadingButton
              loading={isLoadingChangeDiscussionStatus}
              disabled={isLoadingChangeDiscussionStatus}
              onClick={handleAcceptInvitation}
              className="btn btn-primary btn-lg me-md-20 width-100 width-md-auto"
              data-testid="accept-invitation-button">
              {currentStatusCTA && translate(currentStatusCTA)}
            </LoadingButton>
          </Can>
        )}
        {isEqual(currentStatus, ParticipantStatus.REJECTED) && (
          <p className="fw-semibold mb-0 text-danger-600">
            {currentStatusLabel && translate(currentStatusLabel)}
          </p>
        )}
        {isEmpty(currentStatus) && !discussion.has_pending_order && (
          <Can permissions={['create_participant']}>
            <LoadingButton
              loading={isLoadingJoinDiscussion}
              disabled={isLoadingJoinDiscussion}
              onClick={handleJoinDiscussion}
              className="btn btn-primary btn-lg me-md-20 width-100 width-md-auto"
              data-testid="join-discussion-button">
              {t('discussion.join_discussion', 'Join discussion')}
            </LoadingButton>
          </Can>
        )}
        {isEmpty(currentStatus) && discussion.has_pending_order && (
          <div className="d-flex align-items-center text-primary">
            <i className="fa-light fa-hourglass-start fs-24 me-12"></i>
            <p className="fw-semibold mb-0">{t('discussion.pending_payment', 'Pending payment')}</p>
          </div>
        )}
        {!isAuthenticated && (
          <LoadingButton
            onClick={handleGuestJoinDiscussion}
            className="btn btn-primary btn-lg me-md-20 width-100 width-md-auto"
            data-testid="join-discussion-button">
            {t('discussion.join_discussion', 'Join discussion')}
          </LoadingButton>
        )}
      </div>
      <DiscussionSubscribePopup
        discussionId={discussion.id}
        isOpen={isSubscriptionPopupOpen}
        onClose={closeSubscriptionPopup}
      />
      <AuthPopup isOpen={isAuthPopupOpen} onHide={closeAuthPopup} />
    </>
  );
};

export default DiscussionJoinButton;
