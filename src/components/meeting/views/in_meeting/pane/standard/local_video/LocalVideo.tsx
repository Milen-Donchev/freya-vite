import React, { FC, useEffect, useRef } from 'react';
import {
  useApplyVideoObjectFit,
  useAudioVideo,
  useLocalVideo
} from 'amazon-chime-sdk-component-library-react';
import get from 'lodash/fp/get';
import { useGetCurrentUserQuery } from '@store/api/userApi';
import VideoTile from '../video_tile';
import { StyledLocalVideo, LocalVideoProps } from './Styled';

const LocalVideo: FC<LocalVideoProps> = ({ ...rest }: LocalVideoProps) => {
  const { tileId, isVideoEnabled } = useLocalVideo();
  const audioVideo = useAudioVideo();
  const videoEl = useRef<HTMLVideoElement>(null);
  useApplyVideoObjectFit(videoEl);

  const { data: user } = useGetCurrentUserQuery({});

  useEffect(() => {
    if (!audioVideo || !tileId || !videoEl.current || !isVideoEnabled) {
      return;
    }

    audioVideo.bindVideoElement(tileId, videoEl.current);

    return () => {
      const tile = audioVideo.getVideoTile(tileId);
      if (tile) {
        audioVideo.unbindVideoElement(tileId);
      }
    };
  }, [audioVideo, tileId, isVideoEnabled]);

  return (
    <StyledLocalVideo $videoEnabled={isVideoEnabled} {...rest}>
      <VideoTile
        $localAttendee
        $previewMode={false}
        $videoEnabled={isVideoEnabled}
        name={get('data.title')(user) || null}
        photo={get('data.image.thumb')(user) || null}
        $objectFit="cover"
        ref={videoEl}
        {...rest}
      />
    </StyledLocalVideo>
  );
};

export default LocalVideo;
