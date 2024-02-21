import map from 'lodash/map';
import assign from 'lodash/assign';
import isObject from 'lodash/isObject';

import type { ProfileFeature } from '@freya/types/profile';

import { useAppSelector } from '@store';
import { useGetProfileQuery, useGetProfileTypeQuery } from '@store/api/profileApi';

import { extractInitials } from '@utils/helpers';

export const useProfile = (profileId?: number) => {
  const currentUser = useAppSelector((state) => state.currentUserSlice.currentUser);
  const { data: profile, isFetching: isFetchingProfile } = useGetProfileQuery({
    id: profileId ?? currentUser?.id
  });
  const { data: profileType, isFetching: isFetchingProfileType } = useGetProfileTypeQuery(
    { entity: 'user', id: profile?.data?.profile_type?.id },
    { skip: !profile }
  );

  const firstName = profile?.data?.entity?.first_name ?? '';
  const lastName = profile?.data?.entity?.last_name ?? '';
  const initials = firstName && lastName ? extractInitials(`${firstName} ${lastName}`) : '';

  const profileFeaturesRaw = profile?.data?.features;
  const profileFeatures: Record<string, any> = profileFeaturesRaw
    ? getFeatures(profileFeaturesRaw)
    : {};
  const profileTypeFeatures = profileType?.features;

  return {
    isLoading: isFetchingProfile || isFetchingProfileType,
    profile: profile?.data,
    profileType,
    initials,
    profileFeaturesRaw,
    profileFeatures,
    profileTypeFeatures,
    isMyProfile: currentUser?.id === profileId
  };
};

const getFeatures = (profileFeatures: ProfileFeature[]) => {
  let features = {};

  map(Object.entries(profileFeatures), (feature) => {
    if (isObject(feature[1])) {
      const featureProps = feature[1] as any;
      assign(features, { [feature[0]]: featureProps.id });
      return;
    }
    assign(features, { [feature[0]]: feature[1] });
  });

  return features;
};
