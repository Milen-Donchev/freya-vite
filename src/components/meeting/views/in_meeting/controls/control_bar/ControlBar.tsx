import React, { FC } from 'react';
import { ControlBarContext } from './ControlBarProvider';
import { StyledControlBar, ControlBarProps } from './Styled';

export const ControlBar: FC<ControlBarProps> = ({
  tag,
  $showLabels = false,
  $responsive = false,
  className,
  children,
  ...rest
}: ControlBarProps) => {
  const controlBarContext = { $showLabels };

  return (
    <ControlBarContext.Provider value={controlBarContext}>
      <StyledControlBar
        as={tag}
        $responsive={$responsive}
        className={className || ''}
        {...controlBarContext}
        {...rest}>
        {children}
      </StyledControlBar>
    </ControlBarContext.Provider>
  );
};

export default ControlBar;
