import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';

import { getBreakpointMin } from '@components/meeting/utils/accessors';
import { ellipsis, scaleDownAnimation, scaleUpAnimation } from '../../../Styled';

type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export interface VideoTileProps extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  tag?: any;
  style?: any;
  chimeAttendeeId?: string | undefined;
  attendeeId?: string | undefined;
  name?: string | null;
  photo?: string | null;
  $videoEnabled?: boolean | null;
  $sharingContent?: boolean;
  $activeSpeaker?: boolean;
  $previewMode?: boolean;
  $showCamera?: boolean;
  muted?: boolean;
  $localAttendee?: boolean;
  $remoteSize?: number | null;
  $objectFit?: ObjectFit;
  roles?: string[];
  externalUserId?: string | undefined;
}

export const Image = styled.img`
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
`;

export const StyledVideoTile = styled.div<VideoTileProps>`
  display: grid;
  grid-area: ${({ $previewMode }) => !$previewMode && 'extra'};
  grid-template: ${({ $previewMode }) =>
    !$previewMode &&
    `
    'attr' 1fr
    / 1fr
  `};
  width: 100%;
  height: ${({ $sharingContent }) => ($sharingContent ? 'auto' : '100%')};
  min-width: 6.25rem;
  min-height: 6.25rem;
  background-color: ${({ $videoEnabled, $previewMode }) =>
    !$previewMode && !$videoEnabled && '#A2C5E0'};
  border-radius: 0.625rem;
  cursor: ${({ onClick }) => onClick && 'pointer'};
  overflow: hidden;

  &.ch-shared-tile {
    &,
    &.ch-remote-shared {
      display: none;
    }
  }

  &.ch-extra-tile {
    color: var(--bs-primary-400);
    background-color: rgba(var(--bs-white-rgb), 0.5);

    &.active {
      box-shadow: inset 0 0 0 2px var(--bs-primary-400), inset 0 0 0 6px var(--bs-primary-300);
    }
  }

  &.hidden-tile {
    display: none;
  }

  ${getBreakpointMin('md')} {
    &.ch-shared-tile {
      display: none;

      &.ch-remote-shared {
        display: grid;
      }
    }
  }
`;

export const StyledTileAttributes = styled.div<VideoTileProps>`
  position: relative;
  display: ${({ $previewMode }) => !$previewMode && 'grid'};
  grid-area: ${({ $previewMode }) => !$previewMode && 'attr'};
  align-content: ${({ $videoEnabled, $sharingContent }) =>
    $videoEnabled && !$sharingContent ? 'end' : 'center'};
  transition: ${({ $previewMode }) => !$previewMode && 'background-color 0.3s ease-out 0s'};

  ${({ $videoEnabled, $previewMode }) =>
    !$previewMode &&
    !$videoEnabled &&
    `
      display: grid;
      grid-row-gap: 0.25rem;
      place-items: center;
  `};

  ${({ $videoEnabled, $activeSpeaker, $previewMode }) =>
    !$previewMode &&
    $videoEnabled &&
    $activeSpeaker &&
    `
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 0.75rem;
      box-shadow:
        inset 0 0 0 2px var(--bs-primary-400),
        inset 0 0 0 6px var(--bs-primary-200);
    }
  `};

  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
    display: ${({ $videoEnabled }) => !$videoEnabled && 'none'};
  }

  .ch-avatar {
    position: relative;
    display: grid;
    place-content: center;
    width: 3.125rem;
    height: 3.125rem;
    margin-top: ${({ $localAttendee }) => $localAttendee && '0.25rem'};

    > svg {
      font-size: 1.25rem;
    }

    ${getBreakpointMin('lg')} {
      width: ${({ $localAttendee, $sharingContent }) =>
        $localAttendee || $sharingContent ? '3.125rem' : '5rem'};
      height: ${({ $localAttendee, $sharingContent }) =>
        $localAttendee || $sharingContent ? '3.125rem' : '5rem'};

      > svg {
        font-size: 1.5rem;
      }
    }

    ${getBreakpointMin('xl')} {
      width: ${({ $localAttendee, $sharingContent }) =>
        $localAttendee || $sharingContent ? '3.125rem' : '5.5rem'};
      height: ${({ $localAttendee, $sharingContent }) =>
        $localAttendee || $sharingContent ? '3.125rem' : '5.5rem'};

      > svg {
        font-size: 1.75rem;
      }
    }

    font-size: ${({ $localAttendee, $sharingContent }) =>
      $localAttendee || $sharingContent ? '1.25rem' : '1.5rem'};
    color: var(--bs-primary-500);
    background-color: ${({ photo }) => !photo && 'var(--bs-primary-200)'};
    border-radius: 50%;
    overflow: hidden;
    ${({ $activeSpeaker }) => ($activeSpeaker ? scaleUpAnimation : scaleDownAnimation)};

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      box-shadow: ${({ $activeSpeaker }) =>
        $activeSpeaker
          ? 'inset 0 0 0 2px var(--bs-primary-200), inset 0 0 0 6px #A2C5E0'
          : 'inset 0 0 0 2px transparent, inset 0 0 0 6px transparent'};
      border-radius: 50%;
    }
  }

  .ch-name {
    position: ${({ $videoEnabled }) => ($videoEnabled ? 'absolute' : 'static')};
    bottom: ${({ $videoEnabled }) => $videoEnabled && '0.5rem'};
    left: ${({ $videoEnabled }) => $videoEnabled && '0.5rem'};
    display: grid;
    grid-template: ${({ $localAttendee, muted }) => !$localAttendee && muted && 'auto / auto auto'};
    grid-column-gap: ${({ $localAttendee, muted }) => !$localAttendee && muted && '0.5rem'};
    align-items: center;
    max-width: calc(100% - 1.25rem);
    min-height: 1.875rem;

    color: ${({ $videoEnabled }) => $videoEnabled && 'var(--bs-dark)'};
    color: ${({ $videoEnabled, $localAttendee }) =>
      !$videoEnabled && $localAttendee && 'var(--bs-white)'};
    color: ${({ $videoEnabled, $localAttendee }) =>
      !$videoEnabled && !$localAttendee && 'var(--bs-dark)'};

    background-color: ${({ $videoEnabled }) => $videoEnabled && 'var(--bs-primary-100)'};
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;

    div {
      ${ellipsis};
      display: flex;
      align-items: center;
    }

    .ch-text {
      font-size: 0.75rem;
      font-weight: ${({ $activeSpeaker }) => $activeSpeaker && '700'};
      margin: 0;
      ${ellipsis};
    }
  }
`;

export const StyledTileDescription = styled.div<VideoTileProps>`
  display: grid;
  grid-template: auto / auto;
  grid-area: desc;
  width: 100%;
  max-width: 90%;
  justify-self: center;
  text-align: center;
  font-size: 0.875rem;

  ${getBreakpointMin('md')} {
    grid-row-gap: 0.25rem;
    grid-template: auto 1fr / auto;
  }

  .ch-name {
    display: grid;
    grid-template: 1fr / auto auto;
    align-items: center;
    justify-content: center;
    grid-column-gap: 0.625rem;
    font-size: 0.875rem;
    font-weight: 700;

    ${getBreakpointMin('md')} {
      font-size: 1.125rem;
    }
  }

  .ch-desc {
    display: none;

    ${getBreakpointMin('md')} {
      display: grid;
    }
  }
`;
