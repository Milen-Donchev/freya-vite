import React, { FC, useEffect, useState } from 'react';
import {
  useToggleLocalMute,
  useAudioInputs,
  useMeetingManager,
  useLogger
} from 'amazon-chime-sdk-component-library-react';
import { isOptionActive } from '@components/meeting/utils/deviceUtils';
import { useTranslation } from '@hooks/useTranslation';
import { ControlBarButton, PopOverItemProps } from './control_bar';
import { AudioInputControlProps } from './Styled';

const AudioInputControl: FC<AudioInputControlProps> = ({ enabled = true, ...rest }) => {
  const { t } = useTranslation();
  const logger = useLogger();
  const meetingManager = useMeetingManager();
  const { muted, toggleMute } = useToggleLocalMute();
  const { devices, selectedDevice } = useAudioInputs();
  const [dropdownOptions, setDropdownOptions] = useState<PopOverItemProps[]>([]);
  const muteLabel = t('inMeeing.controlBar.audioInputMuteLabel', 'Mute');
  const unmuteLabel = t('inMeeing.controlBar.audioInputUnmuteLabel', 'UnMute');

  useEffect(() => {
    const handleClick = async (deviceId: string): Promise<void> => {
      try {
        await meetingManager.startAudioInputDevice(deviceId);
      } catch (error) {
        logger.error('AudioInputControl failed to select audio input device');
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
              logger.error(`${error}`);
            }
          }
        }))
      );
      setDropdownOptions(ddOptions);
    };

    getDropdownOptions();
  }, [devices, selectedDevice, meetingManager, meetingManager.startAudioInputDevice, logger]);

  return (
    <ControlBarButton
      icon={
        <i
          className={`${muted ? 'fa-light' : 'fa-solid'} ${
            muted ? 'fa-microphone-slash' : 'fa-microphone'
          }`}></i>
      }
      onClick={() => enabled && toggleMute()}
      label={muted ? unmuteLabel : muteLabel}
      $popOver={(enabled && dropdownOptions) || []}
      $isSelected={!muted}
      className={enabled ? '' : 'disabled'}
      enabled={enabled}
      {...rest}
    />
  );
};

export default AudioInputControl;
