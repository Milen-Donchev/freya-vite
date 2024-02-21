import { RefObject, useEffect } from 'react';

const useTabOutside = (
  ref: RefObject<HTMLElement>,
  onTabOutside: (e: KeyboardEvent) => void
) => {
  useEffect(() => {
    const isOutside = () => {
      return (
        !!ref.current &&
        !ref.current.contains(document.activeElement as HTMLElement)
      );
    };

    const keyUp = (e: KeyboardEvent) => {
      if (e.keyCode === 9 && isOutside()) {
        return onTabOutside(e);
      }
    };

    document.addEventListener('keyup', keyUp);

    return () => {
      document.removeEventListener('keyup', keyUp);
    };

  }, [onTabOutside, ref]);
};

export default useTabOutside;
