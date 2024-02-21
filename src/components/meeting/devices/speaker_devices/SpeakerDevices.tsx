import React from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

import {
  useAudioOutputs,
  useLogger,
  useMeetingManager
} from 'amazon-chime-sdk-component-library-react';

import { useTranslation } from '@hooks/useTranslation';
import CustomSelect from '@components/ui/select-field/CustomSelect';
import TestSound from '../../utils/TestSound';

const SoundTestButton = ({ output, disabled }: { output: any; disabled: boolean }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => new TestSound(output)}
      className="btn btn-primary mt-12"
      data-testid="join-profile-button"
      disabled={disabled}>
      {t('meeting.deviceSettings.testAudioLabel', 'Test Audio')}
    </button>
  );
};

type SpeakerDevices = {
  label: string;
  value: string;
};

const SpeakerDevices = () => {
  const { t } = useTranslation();
  const { devices, selectedDevice } = useAudioOutputs();
  const meetingManager = useMeetingManager();
  const isAudioOutputDevices = !isEmpty(devices);
  const logger = useLogger();

  const selectAudioOutput = async (deviceId: string) => {
    try {
      await meetingManager.startAudioOutputDevice(deviceId);
    } catch (error) {
      logger.error(`Failed to start audio output device: ${error}`);
    }
  };

  const options = devices.map((device) => {
    return {
      value: device.deviceId,
      label: device.label
    };
  });

  const handleChange = (e: SpeakerDevices | null) => {
    if (e) {
      const device = e.value;
      selectAudioOutput(device);
    }
  };

  return (
    <div>
      <label className="fs-14">{t('meeting.deviceSettings.speakerTitle', 'Speaker')}</label>
      {isAudioOutputDevices && (
        <CustomSelect<SpeakerDevices, false>
          name="speaker-devices"
          value={find(options, ({ value }) => isEqual(value, selectedDevice))}
          options={options}
          onChange={handleChange}
          placeholder={''}
          className="compact fs-14 fw-bold"
        />
      )}

      <SoundTestButton output={selectedDevice} disabled={!isAudioOutputDevices} />
    </div>
  );
};

export default SpeakerDevices;
