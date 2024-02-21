import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';

import { getBreakpointMin } from '@components/meeting/utils/accessors';

export interface DeviceSidebarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  $isOpen?: boolean;
}

export const StyledDeviceSidebarSettings = styled.div<DeviceSidebarProps>`
  display: none;
  grid-area: sidebar;
  grid-gap: 0.625rem;
  grid-template-rows: auto auto 1fr;
  width: 100%;
  height: 100%;
  align-items: start;
  text-align: left;
  z-index: 2;

  ${({ $isOpen }) => $isOpen && `
    display: grid;
    transform: translateX(0);
  `};

  ${getBreakpointMin('lg')} {
    width: 20rem;
    padding: 0 0 0 1.25rem;
  }

  ${getBreakpointMin('xl')} {
    width: 25rem;
    padding: 0 0 0 2.5rem;
  }
`;

export const StyledDeviceSidebarHeader = styled.div<DeviceSidebarProps>`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: auto 1fr;
  grid-column-gap: 0.625rem;
  align-items: center;
`;

export const StyledDeviceSidebarBody = styled.div<DeviceSidebarProps>`
  display: grid;
  width: 100%;
  height: 100%;
  grid-gap: 0.625rem;
  align-content: start;

  .section-title {
    margin-top: 0.625rem;
  }
`;