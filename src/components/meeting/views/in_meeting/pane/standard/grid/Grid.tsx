import React, { createRef } from 'react';
import { useContentShareMode, useAttendeesCount } from '@components/meeting/hooks';
import LocalVideo from '../local_video/LocalVideo';
import { StyledGrid } from './Styled';

export default ({ children }: any) => {
  const attendeesCount = useAttendeesCount();
  const contentShareMode = useContentShareMode();
  const gridEl = createRef<HTMLDivElement>();

  return (
    <StyledGrid ref={gridEl} size={attendeesCount} $contentShareMode={contentShareMode}>
      {children}
      <LocalVideo />
    </StyledGrid>
  );
};
