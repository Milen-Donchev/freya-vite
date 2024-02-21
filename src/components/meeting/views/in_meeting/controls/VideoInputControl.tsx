import React, { FC, useEffect, useState } from 'react';
import {
  useVideoInputs,
  useLocalVideo,
  useLogger,
  useMeetingManager
} from 'amazon-chime-sdk-component-library-react';
import gt from 'lodash/fp/gt';
import size from 'lodash/fp/size';
import { isOptionActive } from '@components/meeting/utils/deviceUtils';
import { useTranslation } from '@freya/hooks/useTranslation';
import { ControlBarButton, PopOverItemProps } from './control_bar';
import { VideoInputControlProps } from './Styled';

const VideoInputControl: FC<VideoInputControlProps> = ({ enabled, ...rest }) => {
  const { t } = useTranslation();
  const logger = useLogger();
  const meetingManager = useMeetingManager();
  const { devices, selectedDevice } = useVideoInputs();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const [dropdownOptions, setDropdownOptions] = useState<PopOverItemProps[]>([]);

  const hasVideoDevices = gt(size(devices))(0);
  const label = t('inMeeting.controlBar.videoInputLabel', 'Video');

  useEffect(() => {
    const handleClick = async (deviceId: string): Promise<void> => {
      try {
        if (isVideoEnabled) {
          await meetingManager.startVideoInputDevice(deviceId);
        } else {
          meetingManager.selectVideoInputDevice(deviceId);
        }
      } catch (error) {
        logger.error('VideoInputControl failed to select video input device');
      }
    };

    const getDropdownOptions = async (): Promise<void> => {
      const ddOptions = await Promise.all(
        devices.map(async (device) => ({
          children: <span>{device.label}</span>,
          checked: await isOptionActive(selectedDevice, device.deviceId),
          onClick: async () => {
            try {
              return await handleClick(device.deviceId);
            } catch (error) {
              logger.error(`error clicking: ${error}`);
            }
          }
        }))
      );
      setDropdownOptions(ddOptions);
    };

    getDropdownOptions();
  }, [
    devices,
    selectedDevice,
    isVideoEnabled,
    meetingManager,
    meetingManager.startVideoInputDevice,
    logger
  ]);

  return hasVideoDevices ? (
    <ControlBarButton
      icon={
        <i
          className={`${isVideoEnabled ? 'fa-solid' : 'fa-light'} ${
            isVideoEnabled ? 'fa-video' : 'fa-video-slash'
          }`}></i>
      }
      onClick={() => enabled && toggleVideo()}
      label={label}
      $popOver={(enabled && dropdownOptions) || []}
      $isSelected={isVideoEnabled}
      className={enabled ? '' : 'disabled'}
      enabled={enabled}
      {...rest}
    />
  ) : null;
};

export default VideoInputControl;
