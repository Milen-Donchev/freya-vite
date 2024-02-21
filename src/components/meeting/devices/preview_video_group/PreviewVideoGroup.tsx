import React from 'react';
import { useVideoInputs } from 'amazon-chime-sdk-component-library-react';
import compose from 'lodash/fp/compose';
import find from 'lodash/fp/find';
import map from 'lodash/fp/map';
import get from 'lodash/fp/get';
import isEmpty from 'lodash/fp/isEmpty';
import { useTranslation } from '@hooks/useTranslation';
import { fromObject } from '@components/meeting/utils/general';
import { useDeviceSettings } from '../../providers/DeviceSettingsProvider';

import {
  StyledVideoGroup,
  PreviewVideoWrapper,
  PreviewVideoControls,
  StyledPreviewVideo,
  NoCameraDetected
} from '../Styled';

const PreviewVideoGroup = () => {
  const { t } = useTranslation();
  const { devices, selectedDevice } = useVideoInputs();
  const { showCamera, toggleCamera, showDeviceSettings, toggleDeviceSettings } =
    useDeviceSettings();

  const isVideoInputDevices = !isEmpty(devices);

  const options = map(
    fromObject({
      label: get('label'),
      value: get('deviceId')
    })
  )(devices);

  const deviceLabel = (id: any) => compose(get('label'), find({ value: id }))(options);

  return (
    <StyledVideoGroup $videoDevice={isVideoInputDevices}>
      <PreviewVideoWrapper
        $turnOffCamera={!showCamera && isVideoInputDevices}
        $videoDevice={isVideoInputDevices}>
        {showCamera ? (
          <StyledPreviewVideo />
        ) : (
          <>
            {!isVideoInputDevices && (
              <NoCameraDetected>
                <i className="fa-light fa-video-slash fa-4x text-primary-500"></i>
                <label>
                  {t('meeting.deviceSettings.noCameraDetectedLabel', 'No camera detected')}
                </label>
              </NoCameraDetected>
            )}
            {isVideoInputDevices && (
              <>
                <i className="fa-light fa-video-slash fa-4x text-primary-500"></i>
                <label className="fs-2">
                  {t('meeting.deviceSettings.turnOffCameraLabel', 'Your camera is off')}
                </label>
              </>
            )}
          </>
        )}
      </PreviewVideoWrapper>
      {isVideoInputDevices && (
        <PreviewVideoControls $videoDevice={isVideoInputDevices}>
          <i
            className={`
              fa-light
              ${!showCamera ? 'fa-video-slash' : 'fa-video'}
              fa-lg
            `}></i>
          <div className="form-check form-switch mb-0">
            <input
              type="checkbox"
              role="switch"
              id="toggleCamera"
              name="toggleCamera"
              className="form-check-input"
              checked={showCamera}
              onChange={toggleCamera}
              disabled={!isVideoInputDevices}
            />
            <label className="form-check-label fs-14" htmlFor="toggleCamera">
              {deviceLabel(selectedDevice)}
            </label>
          </div>
          <button
            className={`btn btn-icon ${showDeviceSettings ? 'btn-primary' : 'btn-plain'}`}
            onClick={toggleDeviceSettings}
            disabled={!isVideoInputDevices}>
            <i
              className={`${
                showDeviceSettings ? 'fa-solid text-white' : 'fa-light text-primary-500'
              } fa-gear fa-lg`}></i>
          </button>
        </PreviewVideoControls>
      )}
    </StyledVideoGroup>
  );
};

export default PreviewVideoGroup;
