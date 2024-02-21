import React from 'react';
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import { useTranslation } from '@hooks/useTranslation';
import { useDeviceSettings } from '../../providers/DeviceSettingsProvider';

export default () => {
  const { t } = useTranslation();
  const { openInMeeting } = useDeviceSettings();
  const meetingManager = useMeetingManager();

  const join = async () => {
    try {
      await meetingManager.start();
      openInMeeting();
    } catch (err: any) {}
  };

  return (
    <button className="btn btn-primary btn-xl" onClick={join}>
      {t('meeting.deviceSettings.joinMeeting', 'Join meeting')}
    </button>
  );
};
