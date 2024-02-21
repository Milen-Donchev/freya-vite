import { styled } from 'styled-components';
import { VideoTileProps } from '../video_tile';
import { ellipsis } from '../../../Styled';
export interface ContentTileProps extends VideoTileProps {
  tag?: any;
}

export const StyledContentTile = styled.div<ContentTileProps>`
  position: relative;
  display: grid;
  grid-area: sc;
  background-color: #a2c5e0;
  border-radius: 0.75rem;

  video {
    position: absolute;
    inset: 50% 0 0 0;
    width: 100%;
    height: 100%;
    height: auto;
    max-height: 100%;
    border-radius: 0.625rem;
    object-fit: ${(props) => props.$objectFit || 'cover'};
    transform: translateY(-50%);
  }

  label {
    z-index: 1;
  }

  .ch-name {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    display: grid;
    grid-template: ${({ muted }) => muted && 'auto / auto auto'};
    grid-column-gap: ${({ muted }) => muted && '0.5rem'};
    align-items: center;
    max-width: calc(100% - 1.25rem);
    min-height: 1.875rem;
    color: var(--bs-dark);
    background-color: var(--bs-primary-100);
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;

    .ch-text {
      font-size: 0.75rem;
      font-weight: ${({ $activeSpeaker }) => $activeSpeaker && '700'};
      margin: 0;
      ${ellipsis};
    }
  }
`;
