import { createContext, useContext } from 'react';
import { ControlBarProps } from './Styled';

export const ControlBarContext = createContext<ControlBarProps>({
  $showLabels: false
});

export const useControlBarContext = () => {
  return useContext(ControlBarContext);
};

export default ControlBarContext;
