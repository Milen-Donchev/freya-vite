import React, { useEffect, useRef } from 'react';
import { useAudioVideo } from 'amazon-chime-sdk-component-library-react';
import getOr from 'lodash/fp/getOr';
import isNil from 'lodash/fp/isNil';
import trim from 'lodash/fp/trim';
import {
  useAttendeeIsActiveSpeaker,
  useAttendeesCount,
  useAttendeeStatus,
  useContentShareMode
} from '@components/meeting/hooks';
import VideoTile, { VideoTileProps } from '../video_tile';
import { useGetProfileQuery } from '@store';

export default ({ attendeeId, externalUserId, className, style, ...rest }: VideoTileProps) => {
  const audioVideo = useAudioVideo();
  const videoEl = useRef<HTMLVideoElement>(null);
  const { videoEnabled, muted, videoTileId } = useAttendeeStatus(attendeeId!);
  const isActiveSpeaker = useAttendeeIsActiveSpeaker(attendeeId);
  const contentShareMode = useContentShareMode();
  const attendeesCount = useAttendeesCount();
  const isSharing = contentShareMode;
  const remoteSize = attendeesCount;
  const profileId = externalUserId?.replace('userId-', '');

  const { data: profile, isFetching } = useGetProfileQuery(
    {
      id: profileId
    },
    { skip: isNil(profileId) }
  );

  const customClasses = trim(`
    ${className ?? ''}
    ${'ch-standard-tile'}
    ${isSharing ? 'ch-remote-shared' : ''}
    ${!isNil(videoTileId) ? `ch-remote-video--${videoTileId}` : ''}
  `);

  useEffect(() => {
    if (!audioVideo || !videoEl.current || !videoEnabled || isNil(videoTileId)) {
      return;
    }

    audioVideo.bindVideoElement(videoTileId, videoEl.current);

    return () => {
      if (audioVideo.getVideoTile(videoTileId)) {
        audioVideo.unbindVideoElement(videoTileId);
      }
    };
  }, [audioVideo, videoTileId, videoEnabled]);

  return (
    <>
      {isFetching ? null : (
        <VideoTile
          ref={videoEl}
          name={getOr('', 'data.title')(profile)}
          photo={getOr('', 'data.image.thumb')(profile)}
          roles={[]}
          muted={muted}
          $videoEnabled={videoEnabled}
          $sharingContent={isSharing}
          $previewMode={false}
          $localAttendee={false}
          $activeSpeaker={isActiveSpeaker}
          $remoteSize={remoteSize}
          className={customClasses}
          style={style}
          $objectFit="cover"
          {...rest}
        />
      )}
    </>
  );
};
