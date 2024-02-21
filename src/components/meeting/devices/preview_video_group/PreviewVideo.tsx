import React, { useEffect, useRef } from 'react';
import {
  useMeetingManager,
  useLogger,
  useAudioVideo,
  useVideoInputs,
  useLocalVideo
} from 'amazon-chime-sdk-component-library-react';

import VideoTile from '../../views/in_meeting/pane/standard/video_tile';
import { BaseSdkProps } from '../../views/in_meeting/pane/standard/local_video/Styled';

export const PreviewVideo: React.FC<React.PropsWithChildren<BaseSdkProps>> = (
  props
) => {
  const logger = useLogger();
  const audioVideo = useAudioVideo();
  const { selectedDevice } = useVideoInputs();
  const videoEl = useRef<HTMLVideoElement>(null);
  const meetingManager = useMeetingManager();
  const { setIsVideoEnabled, isVideoEnabled } = useLocalVideo();

  useEffect(() => {
    const videoElement = videoEl.current;
    return () => {
      if (videoElement) {
        audioVideo?.stopVideoPreviewForVideoInput(videoElement);
        audioVideo?.stopVideoInput();
        setIsVideoEnabled(false);
      }
    };
  }, [audioVideo]);

  useEffect(() => {
    async function startPreview(): Promise<void> {
      if (!audioVideo || !selectedDevice || !videoEl.current) {
        return;
      }

      try {
        await meetingManager.startVideoInputDevice(selectedDevice);
        audioVideo.startVideoPreviewForVideoInput(videoEl.current);
        setIsVideoEnabled(true);

      } catch (error) {
        logger.error('Failed to start video preview');
      }
    }

    startPreview();
  }, [audioVideo, selectedDevice]);

  return (
    <VideoTile
      $previewMode
      $videoEnabled={isVideoEnabled}
      ref={videoEl}
      {...props}
    />
  );
};

export default PreviewVideo;