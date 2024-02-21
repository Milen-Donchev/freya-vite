import React, { forwardRef } from 'react';
import isNil from 'lodash/fp/isNil';
import { StyledContentTile, ContentTileProps } from './Styled';

const ContentTile = forwardRef((props: ContentTileProps, ref: React.Ref<HTMLVideoElement>) => {
  const { tag, name, muted, $activeSpeaker, className, ...rest } = props;

  return (
    <StyledContentTile
      as={tag}
      muted={muted}
      $activeSpeaker={$activeSpeaker}
      className={className ?? ''}
      {...rest}>
      <video ref={ref} className="ch-video" />
      {!isNil(name) && (
        <header className="ch-name">
          <p className="ch-text">{name}</p>
          {muted && <i className="fa-light fa-microphone-slash fa-xs"></i>}
        </header>
      )}
    </StyledContentTile>
  );
});

export default ContentTile;
