import React from 'react';
import { styled } from 'styled-components';

const Track = styled.div`
  width: 100%;
  height: 0.5rem;
  border: 0.031rem solid var(--bs-primary-400);
  border-radius: 0.75rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: var(--bs-primary-400);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 33ms ease-in-out;
  will-change: transform;
`;

const ActivityBar = React.forwardRef((props, ref: any) => (
  <Track>
    <Progress ref={ref} />
  </Track>
));

export default ActivityBar;
