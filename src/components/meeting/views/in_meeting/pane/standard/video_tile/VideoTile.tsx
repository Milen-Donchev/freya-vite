import React, { forwardRef } from 'react';

import { Image, StyledVideoTile, StyledTileAttributes, VideoTileProps } from './Styled';

const VideoTile = forwardRef((props: VideoTileProps, ref: React.Ref<HTMLVideoElement>) => {
  const {
    muted,
    name = '',
    photo = '',
    roles = {},
    $videoEnabled,
    $sharingContent,
    $activeSpeaker,
    $localAttendee,
    $previewMode,
    hidden,
    $remoteSize,
    className,
    style,
    ...rest
  } = props;

  const attendeeIcon = <i className="fa-light fa-user"></i>;

  return (
    <StyledVideoTile
      $videoEnabled={$videoEnabled}
      $sharingContent={$sharingContent}
      hidden={hidden}
      $remoteSize={$remoteSize}
      $previewMode={$previewMode}
      className={`ch-video-tile ${className ?? ''}`}
      style={style}
      {...rest}>
      <StyledTileAttributes
        muted={muted}
        $videoEnabled={$videoEnabled}
        $sharingContent={$sharingContent}
        $activeSpeaker={!muted && $activeSpeaker}
        $localAttendee={$localAttendee}
        $previewMode={$previewMode}
        name={name}
        {...rest}>
        <video ref={ref} className="ch-video" width="100%" height="100%" />
        {!$videoEnabled && !$previewMode && (
          <>
            <div className={`ch-avatar ${!name ? 'bg-transparent' : ''}`}>
              {!name && (
                <i className="fa-light fa-spin fa-spinner-third fa-lg text-primary-200"></i>
              )}
              {name && !photo && attendeeIcon}
              {name && photo && <Image src={photo} />}
            </div>
            {name && (
              <header className="ch-name">
                <p className="ch-text">{name}</p>
                {!$localAttendee && muted && <i className="fa-light fa-microphone-slash fa-xs"></i>}
              </header>
            )}
          </>
        )}
        {$videoEnabled && !$previewMode && (
          <header className="ch-name">
            {!name && <i className="fa-solid fa-spin fa-spinner-third fa-sm"></i>}
            {name && (
              <>
                <p className="ch-text">{name}</p>
                {!$localAttendee && muted && <i className="fa-light fa-microphone-slash fa-xs"></i>}
              </>
            )}
          </header>
        )}
      </StyledTileAttributes>
    </StyledVideoTile>
  );
});

export default VideoTile;
