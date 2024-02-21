import React from 'react';

import PreviewAudioGroup from './preview_audio_group/PreviewAudioGroup';
import PreviewVideoGroup from './preview_video_group/PreviewVideoGroup';
import { StyledGroupsWrapper } from './Styled';

const DeviceSelection = ({ $sidebar }: { $sidebar: boolean }) => (
  <StyledGroupsWrapper $sidebar={$sidebar}>
    <PreviewVideoGroup />
    <PreviewAudioGroup />
  </StyledGroupsWrapper>
);

export default DeviceSelection;
