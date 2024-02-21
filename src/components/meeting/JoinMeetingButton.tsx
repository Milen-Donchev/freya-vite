import React from 'react';
import { useTranslation } from '@hooks/useTranslation';
import { useJoinMeeting } from './hooks';
import { useDeviceSettings } from './providers/DeviceSettingsProvider';

interface JoinMeetingButtonProps {
  meetingId: string | number;
  className?: string;
  disabled?: boolean;
}

const JoinMeetingButton = (props: JoinMeetingButtonProps) => {
  const { meetingId, className, disabled = false } = props;
  const { t } = useTranslation();
  const { toggleModal, showModal, unleftInMeeting } = useDeviceSettings();
  const { joinChimeMeeting } = useJoinMeeting({ meetingId });

  return (
    <button
      onClick={() => {
        toggleModal();
        unleftInMeeting();
        joinChimeMeeting();
      }}
      className={`btn btn-primary ${className ?? ''}`}
      disabled={disabled || showModal}>
      {t('common.join', 'Join')}
    </button>
  );
};

export default JoinMeetingButton;
