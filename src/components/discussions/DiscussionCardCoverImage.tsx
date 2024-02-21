import React, { memo, useState } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import type { Image as ImageType } from '@types';
import { useChangeDiscussionStatusMutation } from '@store/api/discussionApi';
import { useDiscussion } from '@providers/DiscussionProvider';
import { useTranslation } from '@hooks/useTranslation';
import { getImage } from '@utils/helpers';
import { checkIsDiscussionAdmin } from '@utils/discussions';
import { ParticipantStatus } from '@freya/models/Discussion';
import Can from '@components/can/Can';
import { toastMessage } from '@components/ui/toast-message/InlineMessage';
import { ConfirmationPopup } from '@components/ui/popup/ConfirmationPopup';

interface DiscussionCardCoverImageProps {
  coverImage: ImageType;
}

const DiscussionCardCoverImage = (props: DiscussionCardCoverImageProps) => {
  const { coverImage } = props;
  const { t } = useTranslation();
  const { discussion } = useDiscussion();
  const [changeDiscussionStatusMutation] = useChangeDiscussionStatusMutation();
  const currentStatus = get(discussion, 'participant.status', '');
  const participantId = get(discussion, 'participant.id', '');
  const participantType = get(discussion, 'participant.type', '');
  const isDiscussionAdmin = checkIsDiscussionAdmin(participantType);
  const [showPopup, setShowPopup] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toastMessage(t('common.copy_clipboard_toast', 'Your link is copied.'), 'success');
    });
  };

  const handleLeaveDiscussion = async () => {
    if (!participantId) return;

    try {
      await changeDiscussionStatusMutation({
        profile_id: participantId,
        status: ParticipantStatus.LEFT
      }).unwrap();

      toastMessage(
        t('discussion.left_discussion_toast', 'You successfully left the discussion.'),
        'success'
      );
    } catch (error: any) {}
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="position-relative">
        {getImage(coverImage) && (
          <div className="ratio ratio-39x1">
            <Image
              src={getImage(coverImage)}
              className="img-fluid width-100 height-100 object-fit-cover"
            />
          </div>
        )}
        <Dropdown className="dropdown d-inline-block m-24 position-absolute top-0 end-0">
          <Dropdown.Toggle
            id="dropdown-basic"
            className="btn btn-icon btn-outline-primary btn-lg bg-white dropdownToggle"
            data-testid="dropdown-toggle">
            <i className="fa-regular fa-ellipsis fs-22" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item
              className="dropdown-item"
              onClick={handleCopyLink}
              data-testid="copy-link">
              <i className="fa-light fa-link-simple text-primary me-12"></i>
              {t('discussion.dropdown_copy_link', 'Copy link')}
            </Dropdown.Item>
            {isEqual(currentStatus, ParticipantStatus.JOINED) && !isDiscussionAdmin && (
              <Can permissions={['update_participant']}>
                <Dropdown.Item
                  className="dropdown-item"
                  onClick={handleShowPopup}
                  data-testid="leave-discussion">
                  <i className="fa-light fa-arrow-right-from-bracket text-primary me-12"></i>
                  {t('discussion.leave_discussion', 'Leave discussion')}
                </Dropdown.Item>
              </Can>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ConfirmationPopup
        data-testid="confirmation-popup"
        show={showPopup}
        onHide={handleHidePopup}
        onConfirm={handleLeaveDiscussion}
        size="sm"
        title={t('discussion.leave_discussion_popup_title', 'Leave discussion')}
        body={t(
          'discussion.leave_discussion_popup_body',
          'Are you sure you want to leave the discussion?'
        )}
      />
    </>
  );
};

export default memo(DiscussionCardCoverImage);
