import { useSearchParams } from 'react-router-dom';

import { QueryParams } from '@models/QueryParams';

export const useQueryParams = () => {
  const [searchParams] = useSearchParams();
  const queryParamsObject = Object.fromEntries([...searchParams]);

  const getParam = (param: keyof typeof QueryParams) => queryParamsObject[QueryParams[param]];

  return {
    params: searchParams,
    getParam
  };
};
