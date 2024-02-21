import { ReactNode } from 'react';
import { styled } from 'styled-components';

import { getBreakpointMin, getPortraitOnlyQuery } from '@components/meeting/utils/accessors';
import PreviewVideo from './preview_video_group/PreviewVideo';
import { VideoTileProps } from '../views/in_meeting/pane/standard/video_tile';
import { BaseSdkProps } from '../views/in_meeting/pane/standard/local_video/Styled';

interface StyledGroupsWrapperProps {
  $sidebar?: boolean;
  children?: any;
}

interface AudioSelectorProps extends StyledGroupsWrapperProps {
  label?: string;
  body?: ReactNode;
}

export interface VideoGroupProps extends StyledGroupsWrapperProps {
  $videoDevice?: boolean;
  $turnOffCamera?: boolean;
}

export interface PreviewVideoProps extends VideoTileProps, BaseSdkProps {}

export const StyledGroupsWrapper = styled.div<StyledGroupsWrapperProps>`
  position: relative;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  max-width: 100%;
  width: 100%;
  height: auto;
  transition: max-width 0.15s linear 0s;

  ${getBreakpointMin('md')} {
    grid-template-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.25rem;
    align-items: start;
    max-width: ${({ $sidebar }) => ($sidebar ? '100%' : '90%')};
  }

  ${getBreakpointMin('lg')} {
    grid-gap: 1.25rem;
    max-width: ${({ $sidebar }) => ($sidebar ? '100%' : '92%')};
  }

  ${getBreakpointMin('xl')} {
    grid-gap: 2.5rem;
    max-width: ${({ $sidebar }) => ($sidebar ? '100%' : '95%')};
  }

  ${getPortraitOnlyQuery()} {
    grid-template-columns: 1fr;
  }
`;

export const StyledVideoGroup = styled.div<VideoGroupProps>`
  position: relative;
  display: grid;
  grid-row-gap: ${({ $videoDevice }) => $videoDevice && '1.25rem'};
  align-items: start;
  align-content: space-between;
  padding: ${({ $videoDevice }) => $videoDevice && '0.25rem 0.25rem 0.625rem'};
  text-align: left;
  border: 1px solid var(--bs-primary-400);
  border-radius: 0.75rem;

  ${getBreakpointMin('md')} {
    padding: ${({ $videoDevice }) => $videoDevice && '1.25rem 1.25rem 0.625rem'};
  }
`;

export const PreviewVideoWrapper = styled.div<VideoGroupProps>`
  display: grid;
  grid-gap: 0.625rem;
  width: 100%;
  height: auto;
  min-height: 9rem;
  align-content: ${({ $videoDevice }) => !$videoDevice && 'start'};
  place-content: ${({ $videoDevice, $turnOffCamera }) =>
    $videoDevice && $turnOffCamera && 'center'};
  justify-items: ${({ $videoDevice, $turnOffCamera }) =>
    $videoDevice && $turnOffCamera && 'center'};
  background-color: ${({ $videoDevice, $turnOffCamera }) =>
    $videoDevice && $turnOffCamera ? 'var(--bs-primary-200)' : 'var(--bs-primary-500)'};
  background-color: ${({ $videoDevice }) => !$videoDevice && 'transparent'};
  border-radius: 0.75rem;
  overflow: hidden;

  ${getBreakpointMin('md')} {
    height: 9.063rem;
  }

  ${getBreakpointMin('lg')} {
    height: 10.438rem;
  }

  ${getBreakpointMin('xl')} {
    height: 12.875rem;
  }
`;

export const StyledPreviewVideo = styled(PreviewVideo)<PreviewVideoProps>`
  height: 100%;

  video {
    object-fit: contain;

    ${getBreakpointMin('md')} {
      max-height: 9.063rem;
    }

    ${getBreakpointMin('lg')} {
      max-height: 10.438rem;
    }

    ${getBreakpointMin('xl')} {
      max-height: 12.875rem;
    }
  }
`;

export const PreviewVideoControls = styled.div<VideoGroupProps>`
  display: grid;
  grid-template-areas: 'icon toggle settings';
  grid-template-columns: auto 1fr auto;
  grid-column-gap: ${({ $videoDevice }) => $videoDevice && '0.625rem'};
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 0 0.625rem;

  > *:nth-child(1) {
    grid-area: icon;
  }
  > *:nth-child(2) {
    grid-area: toggle;
  }
  > *:nth-child(3) {
    grid-area: settings;
  }

  ${getBreakpointMin('md')} {
    padding: 0;
  }
`;

export const StyledAudioGroup = styled.div`
  display: grid;
  grid-gap: 1rem;
  align-items: start;
  align-content: space-between;
  text-align: left;
  border-radius: 0.75rem;

  ${getBreakpointMin('md')} {
    grid-gap: 1.25rem;
  }
`;

export const StyledAudioGroupDeviceLabels = styled.div`
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: 1fr auto;
  grid-column-gap: 0.625rem;
  align-items: center;
`;

export const StyledAudioTypeBody = styled.div<AudioSelectorProps>`
  display: grid;
  grid-gap: 0.625rem;
  width: 100%;
  height: 100%;
  padding: 0.625rem 0;
`;

export const PreviewAudioControls = styled.div`
  display: grid;
  grid-template-areas: 'input output' 'note note';
  grid-template-columns: auto 1fr;
  grid-row-gap: 0.625rem;
  grid-column-gap: 2.5rem;
  width: 100%;
  align-items: center;
  margin-top: 0.625rem;

  > *:nth-child(1) {
    grid-area: input;
  }
  > *:nth-child(2) {
    grid-area: output;
  }
  > *:nth-child(3) {
    grid-area: note;
  }
`;

export const StyledAudioControl = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 0.625rem;
  align-items: center;
`;

export const StyledAudioSelector = styled.div<AudioSelectorProps>`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;

  background-color: transparent;
  padding: unset;
  border-radius: 0.75rem;
`;

export const StyledAudioTypeHeader = styled.label<AudioSelectorProps>`
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const NoCameraDetected = styled.div<PreviewVideoProps>`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 12.875rem;
  border-radius: 0.625rem;
  align-content: start;
  place-content: center;
  justify-items: center;
  overflow: hidden;
`;
