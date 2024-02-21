import React, { FC } from 'react';

import { useTranslation } from '@hooks/useTranslation';
import { useDeviceSettings } from '@components/meeting/providers/DeviceSettingsProvider';

import AudioDevices from '../../../devices/audio_devices/AudioDevices';
import VideoDevices from '../../../devices/video_devices/VideoDevices';

import {
  StyledDeviceSidebarSettings,
  DeviceSidebarProps,
  StyledDeviceSidebarHeader,
  StyledDeviceSidebarBody
} from './Styled';

const DeviceSidebarSettings: FC<DeviceSidebarProps> = ({
  ...rest
}: DeviceSidebarProps) => {
  const { t } = useTranslation();
  const { closeDeviceSettings, showDeviceSettings } = useDeviceSettings();

  return (
    <StyledDeviceSidebarSettings $isOpen={showDeviceSettings} {...rest}>
      <StyledDeviceSidebarHeader>
        <button
          className="btn btn-ghost-primary btn-lg"
          onClick={closeDeviceSettings}
        >
          <i className="fa-light fa-arrow-left" />
          <span className="fs-4 fw-bold m-8 text-primary-500">
            {t('meeting.deviceSettings.title', 'Back')}
          </span>
        </button>
      </StyledDeviceSidebarHeader>
      <StyledDeviceSidebarBody>
        <label className="fs-18 section-title fw-bold">
          {t('meeting.deviceSettings.audioTitle', 'Audio')}
        </label>
        <AudioDevices />
        <label className="fs-18 section-title fw-bold">
          {t('meeting.deviceSettings.videoTitle', 'Video')}
        </label>
        <VideoDevices />
      </StyledDeviceSidebarBody>
    </StyledDeviceSidebarSettings>
  );
};

export default DeviceSidebarSettings;
