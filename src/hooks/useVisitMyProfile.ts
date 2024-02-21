import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useGetCurrentProfileQuery } from '@store/api/profileApi';

export const useVisitMyProfile = (props?: {
  withReplace?: boolean;
  extraRoutes?: string;
  skip?: boolean;
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);
  const { data } = useGetCurrentProfileQuery(
    {
      id: currentUser?.id
    },
    {
      skip: props?.skip
    }
  );
  const profile = data?.data;

  const goToMyProfile = () =>
    navigate(`${Routes.BASE_PROFILE}/${profile?.id}/${profile?.slug}${props?.extraRoutes ?? ''}`, {
      replace: props?.withReplace ?? false
    });

  return {
    goToMyProfile
  };
};
