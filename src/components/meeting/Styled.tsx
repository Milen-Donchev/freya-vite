import { HTMLAttributes } from 'react';
import { styled, css } from 'styled-components';
import {
  getBreakpointMin,
  getBreakpointMax,
  getBreakpointVerticalMax,
  getPortraitOnlyQuery
} from '@components/meeting/utils/accessors';

export interface StyledMeetingProps extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  $showModal?: boolean | undefined;
  $maximize?: boolean | undefined;
  $meetingStarted?: boolean | undefined;
}

const defaultCardStyles = css`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
  border-radius: 0 !important;
`;

export const StyledMeeting = styled.div<StyledMeetingProps>`
  display: grid;

  ${({ $showModal, $maximize, $meetingStarted }) =>
    $showModal &&
    `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--bs-gray-500-rgb), 0.7);
    z-index: 1053;

    .card {
      position: absolute;
      ${defaultCardStyles};
      z-index: 1054;

      ${getBreakpointMin('md')} {
        top: 50%;
        left: 50%;
        width: ${!$maximize && '130vmin'};
        height: ${!$maximize && '70vmin'};
        max-width: ${!$maximize && '90%'};
        max-height: ${!$maximize && '90%'};
        border-radius: ${!$maximize && '24px !important'};
        transform: translate(-50%, -50%);
      }

      ${getBreakpointVerticalMax('md')} {
        ${defaultCardStyles};

        .meeting-modal-header-wrapper {
          display: none !important;
        }
        .meeting-modal-content-wrapper {
          padding: 0!important;

          main {
            border-radius: 0;
          }
        }
      }

      ${getBreakpointMax('xl')} {
        ${defaultCardStyles};
      }

      ${getPortraitOnlyQuery()} {
        transform: rotate(270deg);
        transform-origin: top left;
        top: 100%;
        left: 0;
        width: 100vh;
        height: 100vw;
        max-height: 100vw;
        border-radius: 0 !important;

        .maximize-button {
          display: none !important;
        }

        .meeting-modal-header-wrapper {
          display: ${$meetingStarted ? 'none !important' : 'inherit'};
        }

        .meeting-modal-content-wrapper {
          padding: 0 !important;
        }
      }
    }
  `};
`;
