import React from 'react';
import { useAudioInputs, useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import { useDeviceSettings } from '../../providers/DeviceSettingsProvider';
import { useTranslation } from '@hooks/useTranslation';
import DeviceSelection from '../../devices/DeviceSelection';
import DeviceSidebarSettings from './device_sidebar_settings/DeviceSidebarSettings';
import MeetingStartButton from './MeetingStartButton';
import { StyledDeviceSetup, StyledPanelBody, StyledPanelFooter } from './Styled';

const CancelMeetingButton = () => {
  const { t } = useTranslation();
  const { toggleModal, leftInMeeting } = useDeviceSettings();
  const meetingManager = useMeetingManager();

  return (
    <button
      className="btn btn-outline-primary btn-xl"
      onClick={async () => {
        await meetingManager.leave();
        // Remove event callback.
        window.onbeforeunload = null;

        leftInMeeting();
        toggleModal();
      }}>
      {t('common.cancel', 'Cancel')}
    </button>
  );
};

const DeviceSetup = () => {
  const { t } = useTranslation();
  const meetingManager = useMeetingManager();
  const { showDeviceSettings, toggleModal, meetingLeft, meetingStarted } = useDeviceSettings();
  const audioInputs = useAudioInputs();

  return (
    <>
      {meetingManager.meetingId ? (
        <StyledDeviceSetup $sidebar={showDeviceSettings}>
          <StyledPanelBody $isOpen={showDeviceSettings}>
            <label className="text-gray-400">
              {t('meeting.deviceSettings.deviceSettingsLabel', 'Choose audio and video settings')}
            </label>
            <DeviceSelection $sidebar={showDeviceSettings} />
          </StyledPanelBody>
          <DeviceSidebarSettings />
          <StyledPanelFooter>
            <CancelMeetingButton />
            <MeetingStartButton />
          </StyledPanelFooter>
        </StyledDeviceSetup>
      ) : (
        <div className="d-grid align-content-center justify-content-center">
          <i className="fa-light fa-spin fa-spinner-third fa-3x text-primary-500"></i>
        </div>
      )}
    </>
  );
};

export default DeviceSetup;
