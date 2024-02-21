import React, { useCallback, useEffect } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import {
  useAudioInputs,
  useLogger,
  useMeetingManager
} from 'amazon-chime-sdk-component-library-react';
import { useTranslation } from '@hooks/useTranslation';
import CustomSelect from '@components/ui/select-field/CustomSelect';

type MicrophoneDevices = {
  label: string;
  value: string;
};

const MicrophoneDevices = () => {
  const { t } = useTranslation();
  const { devices, selectedDevice } = useAudioInputs();
  const meetingManager = useMeetingManager();
  const isAudioInputDevices = !isEmpty(devices);
  const logger = useLogger();

  const selectAudioInput = useCallback(
    async (deviceId: any) => {
      try {
        await meetingManager.startAudioInputDevice(deviceId);
      } catch (error) {
        logger.error(`Failed to start audio input device: ${error}`);
      }
    },
    [meetingManager]
  );

  const options = devices.map((item) => {
    return {
      value: item.deviceId,
      label: item.label
    };
  });

  useEffect(() => {
    if (selectedDevice) {
      selectAudioInput(selectedDevice);
    }
  }, [selectAudioInput, selectedDevice]);

  const handleChange = (e: MicrophoneDevices | null) => {
    if (e) {
      const device = e.value;
      selectAudioInput(device);
    }
  };

  return (
    <div>
      <label className="fs-14">{t('meeting.deviceSettings.microphoneTitle', 'Microphone')}</label>
      {isAudioInputDevices && (
        <CustomSelect<MicrophoneDevices, false>
          name="microphone-devices"
          value={find(options, ({ value }) => isEqual(value, selectedDevice))}
          options={options}
          onChange={handleChange}
          placeholder={''}
          className="compact fs-14 fw-bold"
        />
      )}
    </div>
  );
};

export default MicrophoneDevices;
