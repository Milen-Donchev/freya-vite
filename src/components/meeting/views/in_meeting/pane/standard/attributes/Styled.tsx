import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';
import { gt } from 'lodash/fp';
import {
  getBreakpointMin,
  getPortraitOnlyQuery,
  getBreakpointVerticalMax
} from '@components/meeting/utils/accessors';

export interface StandardNameProps extends Omit<HTMLAttributes<HTMLLabelElement>, ''> {
  $contentShareMode?: boolean;
  size?: number;
}

export const StyledStandardName = styled.label<StandardNameProps>`
  display: ${({ size, $contentShareMode }) => (gt(size)(0) || $contentShareMode ? 'none' : 'grid')};
  grid-area: name;
  align-self: ${({ size }) => (gt(size)(0) ? 'end' : 'start')};
  padding-bottom: ${({ size, $contentShareMode }) =>
    gt(size)(0) && !$contentShareMode && '1.125rem'};
  text-align: center;
  line-height: ${({ size }) => gt(size)(0) && '1'};
  font-size: ${({ size }) => (gt(size)(0) ? '1.25rem' : '1.5rem')};
  font-weight: bold;
  word-break: break-word;

  ${getBreakpointMin('md')} {
    font-size: ${({ size }) => (gt(size)(0) ? '1.75rem' : '2.25rem')};
    font-size: ${({ $contentShareMode }) => $contentShareMode && '1.25rem'};
    padding-left: ${({ size }) => gt(size)(0) && '4.125rem'};
    padding-left: ${({ size, $contentShareMode }) =>
      gt(size)(0) && $contentShareMode && '1.125rem'};
    text-align: ${({ size }) => gt(size)(0) && 'left'};
  }

  ${getPortraitOnlyQuery()} {
    font-size: ${({ size }) => (gt(size)(0) ? '1.25rem' : '1.5rem')};
    text-align: center;
  }

  ${getBreakpointVerticalMax('md')} {
    font-size: 1.25rem;
  }
`;
