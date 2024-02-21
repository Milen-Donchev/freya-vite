import { styled } from 'styled-components';
import { VideoTileProps } from '../video_tile';

export interface BaseSdkProps {
  css?: string;
  className?: string;
}

export interface LocalVideoProps extends BaseSdkProps, VideoTileProps {
  id?: string;
  name?: string;
}

export const StyledLocalVideo = styled.div<LocalVideoProps>`
  grid-area: lv;
  width: 100%;
  height: 100%;
  place-self: end start;
  border-radius: 0.75rem;

  .ch-video-tile {
    color: ${({ $videoEnabled }) => ($videoEnabled ? 'var(--bs-primary-500)' : 'var(--bs-white)')};
    background-color: ${({ $videoEnabled }) => !$videoEnabled && 'var(--bs-primary-400)'};
  }
`;
