import React, { useEffect } from 'react';
import {
  MeetingStatus,
  useLogger,
  useMeetingManager,
  useMeetingStatus
} from 'amazon-chime-sdk-component-library-react';
import eq from 'lodash/fp/eq';
import { useTranslation } from '@hooks/useTranslation';
import NavigationProvider, {
  useNavigation
} from '@components/meeting/providers/NavigationProvider';
import { useDeviceSettings } from '../../providers/DeviceSettingsProvider';
import InMeetingSidebar from './sidebar/InMeetingSidebar';
import InMeetingControls from './controls/InMeetingControls';
import StandardPane from './pane/standard/StandardPane';
import { StyledLayout, StyledLayoutProps, StyledMainPane } from './Styled';

const InMeetingMainPane = () => {
  return (
    <StyledMainPane>
      <StandardPane />
    </StyledMainPane>
  );
};

const CloseMeetingButton = () => {
  const { t } = useTranslation();
  const { toggleModal, leftInMeeting } = useDeviceSettings();

  return (
    <button
      className="btn btn-outline-primary btn-xl"
      onClick={() => {
        leftInMeeting();
        toggleModal();
      }}>
      {t('common.close', 'Close')}
    </button>
  );
};

const InMeetingContent = ({ $showSidebar }: StyledLayoutProps) => {
  const { t } = useTranslation();
  const meetingStatus = useMeetingStatus();
  const { showNavbar, showRoster } = useNavigation();

  useEffect(() => {
    // add event callback to store meeting statistics and show confirmation popup.
    window.onbeforeunload = (event) => {
      if (event) event.returnValue = 'Sure?';
      return 'Sure?';
    };
  }, []);

  return (
    <StyledLayout
      $showNav={showNavbar}
      $showRoster={showRoster}
      $showSidebar={$showSidebar}
      $meetingStatus={meetingStatus}>
      {eq(MeetingStatus.Succeeded)(meetingStatus) && (
        <>
          {$showSidebar && <InMeetingSidebar />}
          <InMeetingMainPane />
          <InMeetingControls />
        </>
      )}
      {eq(MeetingStatus.Failed)(meetingStatus) && (
        <label className="w-auto">
          <i className="fa-light fa-triangle-exclamation fa-lg"></i>
          {t('inMeeting.notification.meetingStatusFailed', 'Something went wrong!')}
        </label>
      )}
      {eq(MeetingStatus.Loading)(meetingStatus) && (
        <i className="fa-light fa-spin fa-spinner-third fa-3x text-primary-500"></i>
      )}
      {eq(MeetingStatus.JoinedFromAnotherDevice)(meetingStatus) && (
        <>
          <label className="w-auto">
            <i className="fa-light fa-triangle-exclamation fa-lg"></i>
            {t(
              'inMeeting.notification.meetingStatusJoinedFromAnotherDevice',
              'You are already in this meeting on another device.'
            )}
          </label>
          <CloseMeetingButton />
        </>
      )}
    </StyledLayout>
  );
};

export default () => {
  const logger = useLogger();
  const meetingManager = useMeetingManager();
  // NB: we expect at this point that the meetingManager has been
  // properly initialized - e.g. in DeviceSetup, and we have access to
  // the attendeeId of the meeting session
  logger.info(`Meeting manager: ${meetingManager}`);

  return (
    <NavigationProvider>
      <InMeetingContent $showSidebar={false} />
    </NavigationProvider>
  );
};
