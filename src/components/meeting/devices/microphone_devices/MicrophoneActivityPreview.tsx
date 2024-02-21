import React from 'react';
import { useTranslation } from '@hooks/useTranslation';

import MicrophoneActivityPreviewBar from './MicrophoneActivityPreviewBar';
import { StyledMicrophoneActivityPreview } from './Styled';

const MicrophoneActivityPreview = () => {
  const { t } = useTranslation();

  return (
    <StyledMicrophoneActivityPreview>
      <label style={{ fontSize: '0.875rem' }}>
        {t('meeting.deviceSettings.microphoneActivityLabel', 'Microphone activity')}
      </label>
      <MicrophoneActivityPreviewBar />
    </StyledMicrophoneActivityPreview>
  );
};
export default MicrophoneActivityPreview;
