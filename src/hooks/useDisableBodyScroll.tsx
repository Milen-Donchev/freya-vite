import { useEffect } from 'react';

export const useDisableBodyScroll = (shouldDisable: boolean) => {
  useEffect(() => {
    shouldDisable
      ? document.body.classList.add('overflow-hidden')
      : document.body.classList.remove('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [shouldDisable]);
};
