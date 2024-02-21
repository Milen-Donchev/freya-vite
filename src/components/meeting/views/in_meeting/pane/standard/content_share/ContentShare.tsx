import React, { useEffect, useRef } from 'react';
import { useAudioVideo, useContentShareState } from 'amazon-chime-sdk-component-library-react';
import compose from 'lodash/fp/compose';
import find from 'lodash/fp/find';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import isNil from 'lodash/fp/isNil';
import map from 'lodash/fp/map';
import replace from 'lodash/fp/replace';
import {
  useAttendeeIsActiveSpeaker,
  useAttendeeStatus,
  useAttendees,
  useSharingAttendee
} from '@components/meeting/hooks';
import { useGetProfileQuery } from '@store';
import ContentTile from './ContentTile';

const ContentShare = ({ className, ...rest }: any) => {
  const audioVideo = useAudioVideo();
  const attendees = useAttendees();
  const { tileId, isLocalUserSharing } = useContentShareState();
  const { sharedAttendeeId } = useSharingAttendee();
  const { muted } = useAttendeeStatus(sharedAttendeeId!);
  const activeSpeaker = useAttendeeIsActiveSpeaker(sharedAttendeeId);

  const sharingProfileId = compose(
    replace('userId-', ''),
    get('externalUserId'),
    find({ chimeAttendeeId: sharedAttendeeId }),
    map((a) => a)
  )(attendees);

  const { data: profile, isFetching } = useGetProfileQuery(
    {
      id: sharingProfileId
    },
    { skip: isNil(sharingProfileId) }
  );

  const sharingAttendeeName =
    !isLocalUserSharing && !isFetching ? getOr('', 'data.title')(profile) : null;

  const videoEl = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!audioVideo || !videoEl.current || !tileId) {
      return;
    }

    audioVideo.bindVideoElement(tileId, videoEl.current);

    return () => {
      const tile = audioVideo.getVideoTile(tileId);
      if (tile) {
        audioVideo.unbindVideoElement(tileId);
      }
    };
  }, [audioVideo, tileId]);

  return tileId ? (
    <ContentTile
      $objectFit="contain"
      name={sharingAttendeeName}
      muted={muted}
      $activeSpeaker={activeSpeaker && !muted}
      className={className ?? ''}
      ref={videoEl}
      {...rest}
    />
  ) : null;
};

export default ContentShare;
