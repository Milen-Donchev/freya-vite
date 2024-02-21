import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';
import filter from 'lodash/fp/filter';
import { render } from '../../utils';
import gridDefs from './defs';
import { getPortraitOnlyQuery } from '@components/meeting/utils/accessors';

interface GridProps extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  size?: number;
  $contentShareMode?: boolean;
}

export const StyledGrid = styled.div<GridProps>`
  position: relative;
  display: grid;
  z-index: 1;

  ${({ size: remoteVideoCount, $contentShareMode }: GridProps) =>
    render(filter({ remoteVideoCount, $contentShareMode })(gridDefs))}

  ${getPortraitOnlyQuery()} {
    ${({ size: remoteVideoCount, $contentShareMode }: GridProps) =>
      render(filter({ remoteVideoCount, $contentShareMode, minWidth: 'default' })(gridDefs))}
  }
`;
