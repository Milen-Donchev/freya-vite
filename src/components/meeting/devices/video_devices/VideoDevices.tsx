import React from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import {
  useVideoInputs,
  useMeetingManager,
  useLogger
} from 'amazon-chime-sdk-component-library-react';
import { useTranslation } from '@hooks/useTranslation';
import CustomSelect from '@components/ui/select-field/CustomSelect';

type VideoDevices = {
  label: string;
  value: string;
};

const VideoDevices = () => {
  const { t } = useTranslation();
  const logger = useLogger();
  const { devices, selectedDevice } = useVideoInputs();
  const meetingManager = useMeetingManager();
  const isVideoInputDevices = !isEmpty(devices);

  const selectVideoInput = async (deviceId: string) => {
    try {
      await meetingManager.startVideoInputDevice(deviceId);
    } catch (error) {
      logger.error(`Failed to start video input device: ${error}`);
    }
  };

  const options = devices.map((item) => {
    return {
      value: item.deviceId,
      label: item.label
    };
  });

  const handleChange = (e: VideoDevices | null) => {
    if (e) {
      const device = e.value;
      selectVideoInput(device);
    }
  };

  return (
    <div>
      <label className="fs-14">{t('meeting.deviceSettings.videoTitle', 'Video Settings')}</label>
      {isVideoInputDevices && (
        <CustomSelect<VideoDevices, false>
          name="video-devices"
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

export default VideoDevices;
