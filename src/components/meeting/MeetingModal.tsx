import React from 'react';
import { useDeviceSettings } from '@components/meeting/providers/DeviceSettingsProvider';
import { StyledMeeting } from '@components/meeting/Styled';
import CardFrame from '@components/ui/frames/CardFrame';
import DeviceSetup from '@components/meeting/views/device_setup/DeviceSetup';
import InMeeting from '@components/meeting/views/in_meeting/InMeeting';

const MeetingModal = () => {
  const { meetingStarted, showModal, showDeviceSettings, maximize, toggleMaximize, meetingName } =
    useDeviceSettings();

  return (
    <>
      {showModal && (
        <StyledMeeting $showModal={showModal} $maximize={maximize} $meetingStarted={meetingStarted}>
          <CardFrame>
            <div
              className={`meeting-modal-header-wrapper align-items-center justify-content-between px-20 pb-12
                ${
                  !meetingStarted && showDeviceSettings
                    ? 'd-none d-xl-inline-flex'
                    : 'd-inline-flex'
                }
                ${meetingStarted ? 'd-none d-xl-inline-flex' : 'd-none d-xl-inline-flex'}
              `}>
              <p className="fs-18 fs-md-24 fw-bold text-dark mt-20 mb-0">{meetingName}</p>
              <button
                className="maximize-button btn btn-icon btn-ghost-primary btn-lg d-none d-md-grid mt-20"
                onClick={toggleMaximize}>
                <i className={`fa-light fa-${maximize ? 'compress' : 'expand'}`}></i>
              </button>
            </div>
            <div
              className={`meeting-modal-content-wrapper d-grid align-items-center height-100
                ${meetingStarted ? 'p-xl-20 pt-xl-0' : ''}
              `}>
              {!meetingStarted && <DeviceSetup />}
              {meetingStarted && <InMeeting />}
            </div>
          </CardFrame>
        </StyledMeeting>
      )}
    </>
  );
};

export default MeetingModal;
