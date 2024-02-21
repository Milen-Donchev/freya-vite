import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';
import { getBreakpointMin, getPortraitOnlyQuery } from '@components/meeting/utils/accessors';

interface DeviceSetupProps extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  $sidebar?: boolean;
}

interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  $isOpen?: boolean;
}

export const StyledDeviceSetup = styled.div<DeviceSetupProps>`
  position: relative;
  display: grid;
  grid-template-areas: ${({ $sidebar }) =>
    $sidebar
      ? `
        'sidebar'
        'footer'
      `
      : `
        'body'
        'footer'
      `};
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  align-content: space-between;
  padding: 1.25rem;
  text-align: center;
  border-radius: 0.75rem;

  ${getBreakpointMin('lg')} {
    grid-template-rows: auto 1fr;
    grid-template-areas: ${({ $sidebar }) =>
      $sidebar
        ? `
          'body sidebar'
          'footer footer'
        `
        : `
        'body'
        'footer'
      `};
  }
`;

export const StyledPanelBody = styled.div<PanelProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'none' : 'grid')};
  grid-gap: 0.625rem;
  grid-area: body;
  justify-items: center;

  ${getBreakpointMin('md')} {
    grid-gap: 1.25rem;
  }

  ${getBreakpointMin('lg')} {
    display: grid;
  }
`;

export const StyledPanelFooter = styled.div<PanelProps>`
  display: grid;
  grid-area: footer;
  grid-template-columns: auto auto;
  grid-column-gap: 0.625rem;

  ${getBreakpointMin('md')} {
    place-content: end;
  }

  ${getPortraitOnlyQuery()} {
    place-content: unset;
  }
`;
