import React from 'react';

import { useGetDictionaryQuery } from '@store/api/configApi';

export const DictionaryProvider = ({ children }: { children: React.ReactNode }) => {
  const { isFetching, isError } = useGetDictionaryQuery('');
  return <>{!isFetching && !isError && children}</>;
};
