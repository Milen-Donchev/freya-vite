import React, { ReactNode, useEffect, useState } from 'react';
import { loadConfig } from '@freya/config';

export const Config = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        await loadConfig();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return <>{!isLoading && children}</>;
};
