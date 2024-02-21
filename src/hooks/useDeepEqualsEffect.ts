import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

export const useDeepEqualsEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const depsRef = useRef(deps);

  if (!isEqual(depsRef.current, deps)) {
    depsRef.current = deps;
  }

  useEffect(effect, [depsRef.current]);
};
