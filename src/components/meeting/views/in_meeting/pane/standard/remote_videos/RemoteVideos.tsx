import React, { memo, useEffect, useState } from 'react';
import gt from 'lodash/fp/gt';
import isNil from 'lodash/fp/isNil';
import size from 'lodash/fp/size';
import { useAttendees, useContentShareMode } from '@freya/components/meeting/hooks';
import RemoteVideo from './RemoteVideo';
import ExtraRemoteVideos from './ExtraVideos';
import { VideoTileProps } from '../video_tile';

const MAX_DEFAULT_GALLERY_COUNT = {
  xs: 4,
  sm: 4,
  md: 4,
  lg: 4
};

const MAX_SHARE_MODE_GALLERY_COUNT = {
  xs: 0,
  sm: 3,
  md: 4,
  lg: 4
};

const StandardRemoteVideos = (props: any) => {
  const attendees = useAttendees();
  const contentShareMode = useContentShareMode();
  const remoteSize = size(attendees);
  const [defaultGalleryCount, setDefaultGalleryCount] = useState(MAX_DEFAULT_GALLERY_COUNT.xs);
  const [shareModeGalleryCount, setShareModeGalleryCount] = useState(
    MAX_SHARE_MODE_GALLERY_COUNT.xs
  );

  useEffect(() => {
    // Update the screen width when the window is resized
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Change the number of columns displayed based on the screen size.
      if (screenWidth >= 992) {
        setDefaultGalleryCount(MAX_DEFAULT_GALLERY_COUNT.lg);
        setShareModeGalleryCount(MAX_SHARE_MODE_GALLERY_COUNT.lg);
      } else if (screenWidth >= 768) {
        setDefaultGalleryCount(MAX_DEFAULT_GALLERY_COUNT.md);
        setShareModeGalleryCount(MAX_SHARE_MODE_GALLERY_COUNT.md);
      } else if (screenWidth >= 568) {
        setDefaultGalleryCount(MAX_DEFAULT_GALLERY_COUNT.sm);
        setShareModeGalleryCount(MAX_SHARE_MODE_GALLERY_COUNT.sm);
      } else {
        setDefaultGalleryCount(MAX_DEFAULT_GALLERY_COUNT.xs);
        setShareModeGalleryCount(MAX_SHARE_MODE_GALLERY_COUNT.xs);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const hasExtraGridTile = (n: number): Boolean =>
    !contentShareMode && gt(n)(defaultGalleryCount) && !isNil(remoteSize);
  const hasExtraSharingTile = (n: number): Boolean =>
    contentShareMode && gt(n)(shareModeGalleryCount) && !isNil(remoteSize);

  const extraGridTile = (n: number): Boolean =>
    gt(n)(contentShareMode ? shareModeGalleryCount : defaultGalleryCount);
  const calculateExtraGridStyles = (idx: number): String =>
    extraGridTile(idx + 1) ? 'hidden-tile' : '';

  return (
    <>
      {attendees.map(({ chimeAttendeeId, externalUserId }: VideoTileProps, idx: number) => {
        return (
          <RemoteVideo
            key={chimeAttendeeId}
            attendeeId={chimeAttendeeId}
            externalUserId={externalUserId}
            style={{ gridArea: `vt-${idx + 1}` }}
            className={`${calculateExtraGridStyles(idx)} ${props.className ?? ''}`}
            {...props}
          />
        );
      })}
      {hasExtraGridTile(remoteSize) && (
        <ExtraRemoteVideos remoteSize={remoteSize} maxCount={defaultGalleryCount} />
      )}
      {hasExtraSharingTile(remoteSize) && (
        <ExtraRemoteVideos remoteSize={remoteSize} maxCount={shareModeGalleryCount} />
      )}
    </>
  );
};

export default memo(StandardRemoteVideos);
