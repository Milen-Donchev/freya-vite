import React, { useState } from 'react';
import {
  useAudioInputs,
  useToggleLocalMute,
  useAudioOutputs
} from 'amazon-chime-sdk-component-library-react';
import compose from 'lodash/fp/compose';
import find from 'lodash/fp/find';
import map from 'lodash/fp/map';
import get from 'lodash/fp/get';
import isEmpty from 'lodash/fp/isEmpty';
import eq from 'lodash/fp/eq';
import { useTranslation } from '@hooks/useTranslation';
import { fromObject } from '@components/meeting/utils/general';

import { useDeviceSettings } from '../../providers/DeviceSettingsProvider';
import { MicrophoneActivityPreview } from '../microphone_devices';

import {
  StyledAudioGroupDeviceLabels,
  PreviewAudioControls,
  StyledAudioControl,
  StyledAudioGroup,
  StyledAudioSelector,
  StyledAudioTypeHeader,
  StyledAudioTypeBody
} from '../Styled';

const AudioInputs = () => {
  const { devices } = useAudioInputs();
  if (isEmpty(devices)) return false;

  return true;
};

const AudioOutputs = () => {
  const { devices } = useAudioOutputs();
  if (isEmpty(devices)) return false;

  return true;
};

const AudioInputDeviceLabel = () => {
  const { devices, selectedDevice } = useAudioInputs();

  const options = map(
    fromObject({
      label: get('label'),
      value: get('deviceId')
    })
  )(devices);

  const deviceLabel = (id: any) => compose(get('label'), find({ value: id }))(options);

  if (isEmpty(devices)) return null;

  return deviceLabel(selectedDevice);
};

const AudioOutputDeviceLabel = () => {
  const { devices, selectedDevice } = useAudioOutputs();

  const options = map(
    fromObject({
      label: get('label'),
      value: get('deviceId')
    })
  )(devices);

  const deviceLabel = (id: any) => compose(get('label'), find({ value: id }))(options);

  if (isEmpty(devices)) return null;

  return deviceLabel(selectedDevice);
};

const Separator = () => <hr className="my-0 text-secondary-400" />;

const CustomAudioBody = () => {
  const { t } = useTranslation();
  const { muted, toggleMute } = useToggleLocalMute();
  const { showDeviceSettings, toggleDeviceSettings } = useDeviceSettings();

  const isAudioInputDevices = AudioInputs();
  const isAudioOutputDevices = AudioOutputs();
  const audioInputLabel = AudioInputDeviceLabel();
  const audioOutputLabel = AudioOutputDeviceLabel();

  return (
    <>
      <StyledAudioGroupDeviceLabels>
        <label className="fs-14">
          {isAudioInputDevices || isAudioOutputDevices
            ? t(
                isAudioInputDevices && isAudioOutputDevices
                  ? 'meeting.deviceSettings.allAudioDevicesLabel'
                  : 'meeting.deviceSettings.missedSomeAudioDevicesLabel',
                isAudioInputDevices && isAudioOutputDevices
                  ? `${audioInputLabel} and ${audioOutputLabel}`
                  : `${audioInputLabel} ${audioOutputLabel}`
              )
            : t('meeting.deviceSettings.noAudioDevicesDetectedLabel', 'No audio device detected')}
        </label>
        <button
          className={`btn btn-icon ${showDeviceSettings ? 'btn-primary' : 'btn-plain'}`}
          onClick={toggleDeviceSettings}>
          <i
            className={`${
              showDeviceSettings ? 'fa-solid text-white' : 'fa-light text-primary-500'
            } fa-gear fa-lg`}></i>
        </button>
      </StyledAudioGroupDeviceLabels>

      {!isAudioInputDevices && (
        <label>
          {t('meeting.deviceSettings.noMicrophoneDetectedLabel', 'No microphone detected')}
        </label>
      )}
      {!isAudioOutputDevices && (
        <label>{t('meeting.deviceSettings.noSpeakerDetectedLabel', 'No speaker detected')}</label>
      )}
      <Separator />
      <PreviewAudioControls>
        <StyledAudioControl>
          <i
            className={`
              fa-light
              ${!muted && isAudioInputDevices ? 'fa-microphone' : 'fa-microphone-slash'}
              fa-lg
            `}></i>
          <div className="form-check form-switch mb-0">
            <input
              type="checkbox"
              role="switch"
              id="toggleMute"
              name="toggleMute"
              className="form-check-input"
              checked={!muted}
              onChange={toggleMute}
              disabled={!isAudioInputDevices}
            />
            <label className="form-check-label fs-14" htmlFor="toggleMute">
              {t(
                !muted
                  ? 'meeting.deviceSettings.controlbar.audioInputUnmutedIconTitle'
                  : 'meeting.deviceSettings.controlbar.audioInputMutedIconTitle',
                !muted ? 'Microphone' : 'Muted microphone'
              )}
            </label>
          </div>
        </StyledAudioControl>
      </PreviewAudioControls>
      {isAudioInputDevices && !muted && (
        <>
          <Separator />
          <MicrophoneActivityPreview />
        </>
      )}
    </>
  );
};

const AudioTypeHeader = ({ value, checked, onChange }: any) => {
  const { t } = useTranslation();

  return (
    <StyledAudioTypeHeader>
      <input
        type="radio"
        name="audioSelect"
        value={value}
        checked={checked}
        onChange={onChange}
        hidden
      />
      <span style={{ fontWeight: checked && '700' }}>
        {t('meeting.deviceSettings.audioSelectorLabel', 'Audio')}
      </span>
    </StyledAudioTypeHeader>
  );
};

const AudioTypeBody = ({ hidden, children }: any) =>
  hidden && <StyledAudioTypeBody>{children}</StyledAudioTypeBody>;

const AudioSelector = ({ value, checked, onChange, children }: any) => (
  <StyledAudioSelector>
    <AudioTypeHeader value={value} checked={checked} onChange={onChange} />
    <AudioTypeBody hidden={checked}>{children}</AudioTypeBody>
  </StyledAudioSelector>
);

export default () => {
  const [type, setType] = useState('custom');
  const onChangeValue = (e: any) => setType(e.target.value);

  return (
    <StyledAudioGroup>
      <AudioSelector value="custom" checked={eq('custom')(type)} onChange={onChangeValue}>
        <CustomAudioBody />
      </AudioSelector>
    </StyledAudioGroup>
  );
};
