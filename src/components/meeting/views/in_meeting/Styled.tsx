import { styled, css, keyframes } from 'styled-components';
import { MeetingStatus } from 'amazon-chime-sdk-component-library-react';
import includes from 'lodash/fp/includes';
import cond from 'lodash/fp/cond';
import always from 'lodash/fp/always';
import T from 'lodash/fp/stubTrue';
import { getBreakpointMin, getPortraitOnlyQuery } from '@components/meeting/utils/accessors';

export interface StyledContentProps {}

export interface StyledLayoutProps {
  meetingId?: string;
  $showNav?: boolean | undefined;
  $showRoster?: boolean | undefined;
  $showSidebar?: boolean | undefined;
  $meetingStatus?: MeetingStatus;
}

const navTemplateStyles = css<StyledLayoutProps>`
  grid-template:
    'nav content' 1fr
    'controls controls' auto
    / auto 1fr;
`;

const rosterTemplateStyles = css<StyledLayoutProps>`
  grid-template:
    'roster content' 1fr
    'controls controls' auto
    / auto 1fr;
`;

const defaultTemplateStyles = css<StyledLayoutProps>`
  grid-template:
    'content' 1fr
    'controls' auto
    / 1fr;
`;

const unloadedLayoutStyles = css<StyledLayoutProps>`
  grid-template: auto / 1fr;
  grid-row-gap: 1.25rem;
  place-items: center;
  align-content: center;
`;

const templateStyles = css<StyledLayoutProps>`
  ${cond([
    [(props: any) => props.$showSidebar, always(defaultTemplateStyles)],
    [(props: any) => props.$showNav, always(navTemplateStyles)],
    [(props: any) => props.$showRoster, always(rosterTemplateStyles)],
    [T, always(defaultTemplateStyles)]
  ])};
`;

const layoutStyles = css<StyledLayoutProps>`
  ${cond([
    [
      ({ $meetingStatus }: any) =>
        includes($meetingStatus)([
          MeetingStatus.Failed,
          MeetingStatus.Loading,
          MeetingStatus.JoinedFromAnotherDevice
        ]),
      always(unloadedLayoutStyles)
    ],
    [T, always(templateStyles)]
  ])};
`;

export const StyledLayout = styled.main<StyledLayoutProps>`
  display: grid;
  height: 100%;
  width: 100%;
  border: 0.063rem solid var(--bs-primary-400);
  overflow: hidden;
  ${layoutStyles};

  ${getBreakpointMin('xl')} {
    border-radius: 0.75rem;
  }

  ${getPortraitOnlyQuery()} {
    border-radius: 0.063rem;
  }
`;

export const StyledMainPane = styled.div<StyledContentProps>`
  position: relative;
  display: grid;
  grid-template: 1fr / 1fr;
  grid-area: content;
  width: 100%;
  height: 100%;
  padding: 0.625rem;
  overflow: hidden;
  background-color: var(--bs-primary-200);
`;

export const ellipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: normal;
`;

const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

const scaleDown = keyframes`
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const scaleUpAnimation = css`
  animation: ${scaleUp} 0.15s ease 0s forwards;
`;

export const scaleDownAnimation = css`
  animation: ${scaleDown} 0.15s ease 0s forwards;
`;
