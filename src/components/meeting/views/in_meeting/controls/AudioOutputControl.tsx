import React, { useEffect, useState } from 'react';
import { DefaultBrowserBehavior } from 'amazon-chime-sdk-js';
import {
  useAudioOutputs,
  useLocalAudioOutput,
  useLogger,
  useMeetingManager
} from 'amazon-chime-sdk-component-library-react';
import { isOptionActive } from '@components/meeting/utils/deviceUtils';
import { useTranslation } from '@hooks/useTranslation';
import { ControlBarButton, PopOverItemProps } from './control_bar';
import { AudioOutputControlProps } from './Styled';

const AudioOutputControl: React.FC<AudioOutputControlProps> = ({ ...rest }) => {
  const { t } = useTranslation();
  const logger = useLogger();
  const meetingManager = useMeetingManager();
  const { devices, selectedDevice } = useAudioOutputs();
  const { isAudioOn, toggleAudio } = useLocalAudioOutput();
  const [dropdownOptions, setDropdownOptions] = useState<PopOverItemProps[]>([]);

  const label = t('inMeeting.controlBar.audioOutputLabel', 'Speaker');

  useEffect(() => {
    const handleClick = async (deviceId: string): Promise<void> => {
      try {
        if (new DefaultBrowserBehavior().supportsSetSinkId()) {
          await meetingManager.startAudioOutputDevice(deviceId);
        } else {
          logger.error(
            'AudioOutputControl cannot select audio output device because browser does not support setSinkId operation.'
          );
        }
      } catch (error) {
        logger.error('AudioOutputControl failed to select audio output device');
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
  }, [devices, selectedDevice, meetingManager, meetingManager.startAudioOutputDevice, logger]);

  return (
    <ControlBarButton
      icon={
        <i
          className={`${isAudioOn ? 'fa-solid' : 'fa-light'} ${
            isAudioOn ? 'fa-volume' : 'fa-volume-slash'
          }`}></i>
      }
      onClick={toggleAudio}
      label={label}
      $popOver={dropdownOptions.length ? dropdownOptions : null}
      $isSelected={isAudioOn}
      {...rest}
    />
  );
};

export default AudioOutputControl;
