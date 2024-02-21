import React from 'react';
import { ControlBar } from './control_bar/ControlBar';
import AudioInputControl from './AudioInputControl';
import AudioOutputControl from './AudioOutputControl';
import VideoInputControl from './VideoInputControl';
import ContentShareControl from './ContentShareControl';
import EndMeetingControl from './EndMeetingControl';

const MeetingControls = () => {
  const enabled = true;

  return (
    <ControlBar $showLabels>
      <AudioInputControl enabled={enabled} />
      <VideoInputControl enabled={enabled} />
      <ContentShareControl enabled={enabled} />
      <AudioOutputControl />
      <EndMeetingControl />
    </ControlBar>
  );
};

export default MeetingControls;
