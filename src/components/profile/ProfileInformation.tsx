import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import map from 'lodash/map';
import Skeleton from 'react-loading-skeleton';

import type { ProfileFeature } from '@freya/types/profile';
import type { SelectValueProps } from '@components/ui/form-utils/FormSelectField';

import { useProfile } from '@hooks/useProfile';
import { useTranslation } from '@hooks/useTranslation';
import { useProcessFiles } from '@hooks/useProcessFiles';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import { Routes } from '@models/Routes';
import { getImage } from '@utils/helpers';
import { useEditProfileMutation } from '@store/api/profileApi';
import { setCurrentUser } from '@store/currentUserSlice';

import ProfileImage from '@components/profile/ProfileImage';
import CardFrame from '@components/ui/frames/CardFrame';
import AppointmentButton from '@components/ui/buttons/AppointmentButton';

export interface FeatureEntityProps {
  feature: ProfileFeature;
  featureId: number;
  feature_value: number;
  id: number;
  profileId: number;
  value: string | SelectValueProps;
}

interface ProfileInformationProps {
  profileId: number;
  isMyAccount: boolean;
}

const ProfileInformation = (props: ProfileInformationProps) => {
  const { profileId, isMyAccount } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { processFiles } = useProcessFiles();
  const translate = useTranslatedAttribute();
  const [editProfile] = useEditProfileMutation();
  const [images, setImages] = useState<FileList>();

  const { isLoading, profile, initials, profileFeatures, profileFeaturesRaw, profileTypeFeatures } =
    useProfile(profileId);

  const [isImageProcessing, setImageProcessing] = useState<boolean>(false);
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);

  const handleNavigateToEditPage = () => {
    navigate(Routes.EDIT_PROFILE);
  };

  const handleImageChange = async () => {
    if (!isEmpty(profile) && images) {
      setImageProcessing(true);
      const { first_name, last_name } = profile?.entity;

      const result = await processFiles(images);
      const imagePath = get(result[0], 'path');

      let requestData = {
        first_name,
        last_name,
        features: profileFeatures,
        profile_type: profile?.profile_type.id,
        image: imagePath,
        attachments: profile?.attachments
      };

      const updatedProfile = await editProfile({
        id: currentUser?.id,
        formData: requestData
      }).unwrap();

      dispatch(setCurrentUser({ image: get(updatedProfile?.data, 'image') }));
      setImageProcessing(false);
    }
  };

  const handleScheduleNavigate = () => {
    if (profile?.slug) {
      navigate(`/profile/${profileId}/${profile.slug}/schedule`);
    }
  };

  useEffect(() => {
    handleImageChange();
  }, [images]);

  return (
    <CardFrame className="mb-32 p-20 p-lg-40">
      {isLoading ? (
        <ProfileInformationSkeleton />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center pb-20">
            <p className="fs-24 fw-semibold text-dark mb-0 me-12">
               {t('profile.personal_information', 'Personal information')}
            </p>
            {isMyAccount && (
              <>
                <a
                  className="btn btn-outline-primary btn-lg btn-icon d-md-none flex-shrink-0"
                  onClick={handleNavigateToEditPage}>
                  <i className="fa-light fa-pen fs-18" />
                </a>
                <button
                  onClick={handleNavigateToEditPage}
                  className="btn btn-outline-primary btn-lg d-none d-md-block flex-shrink-0"
                  data-testid="edit-profile-button">
                  {t('common.edit', 'Edit')}
                </button>
              </>
            )}
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 mw-lg-28">
              <div className="bg-primary-100 rounded-4 p-20 text-center">
                <div className="d-flex justify-content-center mb-20">
                  <ProfileImage
                    name={initials}
                    isEditModeActive={isMyAccount}
                    size={12}
                    className="fw-bold fs-32"
                    image={getImage(profile?.image, 'thumb')}
                    isImageProcessing={isImageProcessing}
                    setImages={setImages}
                  />
                </div>
                <div>
                  <p className="fs-18 fw-bold">{`${profile?.entity?.first_name} ${profile?.entity?.last_name}`}</p>
                  <p className="fs-14 text-gray-400">{translate(profile?.profile_type?.name)}</p>
                </div>
                {profile?.has_active_schedule && (
                  <AppointmentButton onClick={handleScheduleNavigate} />
                )}
                {/* {!isMyprofile && (
                  <button data-testid="send_message" className="btn btn-lg btn-primary width-100">
                    {t('common.send_message', 'Send message')}
                  </button>
                )} */}
              </div>
            </div>
            <div className="col-12 col-lg-8 mt-32 mt-lg-0 flex-fill">
              <div className="row">
                {map(profileTypeFeatures, (feature) => {
                  const featureName = feature?.slug;
                  const featureValue = isObject(profileFeaturesRaw[featureName])
                    ? translate(get(profileFeaturesRaw[featureName], 'value', {}))
                    : profileFeaturesRaw[featureName];

                  return (
                    <div key={feature.id} className="col-6 col-xl-4 col-xxl-2 pb-20">
                      <p className="fs-14 m-0 text-gray-400">{translate(feature.label)}</p>
                      <p>{featureValue}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </CardFrame>
  );
};

export default ProfileInformation;

const ProfileInformationSkeleton = () => (
  <>
    <div className="row mb-20">
      <div className="col-6">
        <Skeleton width={250} height={40} borderRadius={12} />
      </div>
      <div className="col-6 text-end d-none d-md-block">
        <Skeleton width={100} height={40} borderRadius={100} />
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-lg-4 mw-lg-28">
        <Skeleton height={260} borderRadius={12} />
      </div>
      <div className="col-12 col-lg-8 mt-32 mt-lg-0 flex-fill">
        <Skeleton height={260} borderRadius={12} />
      </div>
    </div>
  </>
);
