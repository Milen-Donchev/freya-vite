import React from 'react';

import MicrophoneDevices from '../microphone_devices';
import SpeakerDevices from '../speaker_devices/SpeakerDevices';

const AudioDevices = () => (
  <>
    <SpeakerDevices />
    <MicrophoneDevices />
  </>
);

export default AudioDevices;
