import React, { useState } from 'react';
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import { useTranslation } from '@hooks/useTranslation';
import { Popup } from '@components/ui/popup/Popup';
import { useDeviceSettings } from '@components/meeting/providers/DeviceSettingsProvider';
import { ControlBarButton } from './control_bar';

export default () => {
  const { t } = useTranslation();
  const { leftInMeeting, toggleModal } = useDeviceSettings();
  const meetingManager = useMeetingManager();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const openPreviewPopup = () => setShowPopup(true);
  const closePreviewPopup = () => setShowPopup(false);
  const label = t('inMeeting.controlBar.endMeetingLabel', 'Leave');

  const EndMeetingModal = () => (
    <Popup
      show={showPopup}
      onHide={closePreviewPopup}
      size="sm"
      title={t('inMeeting.modal.endMeeting.headerTitle', 'Leave Meeting')}
      body={
        <div className="text-center">
          {t('inMeeting.modal.endMeeting.bodyDescription', 'Would you like to leave the meeting?')}
        </div>
      }
      footer={
        <div className="width-100 text-end">
          <button
            key="cancel"
            className="btn btn-outline-primary btn-lg width-100 width-md-auto mb-20 mb-md-0 me-md-20"
            onClick={closePreviewPopup}>
            {t('inMeeting.modal.endMeeting.cancelLink', 'Cancel')}
          </button>
          <button
            key="leave"
            className="btn btn-primary btn-lg width-100 width-md-auto"
            onClick={async () => {
              await meetingManager.leave();
              // Remove event callback.
              window.onbeforeunload = null;

              closePreviewPopup();
              leftInMeeting();
              toggleModal();
            }}>
            {t('inMeeting.modal.endMeeting.endMeetingLink', 'Leave Meeting')}
          </button>
        </div>
      }
    />
  );

  return (
    <>
      <ControlBarButton
        label={label}
        icon={<i className="fa-solid fa-phone-hangup"></i>}
        className="end-meeting-button"
        onClick={openPreviewPopup}
      />
      <EndMeetingModal />
    </>
  );
};
