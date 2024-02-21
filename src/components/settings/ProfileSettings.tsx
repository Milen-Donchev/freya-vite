import map from 'lodash/map';
import get from 'lodash/get';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import React, { useEffect, useState } from 'react';

import { useProfile } from '@hooks/useProfile';
import { useTranslation } from '@hooks/useTranslation';
import { useProcessFiles } from '@hooks/useProcessFiles';
import { setCurrentUser } from '@store/currentUserSlice';
import { useEditProfileMutation } from '@store/api/profileApi';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import ProfileImage from '@components/profile/ProfileImage';
import FormField from '@components/ui/form-utils/FormField';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';
import { toastMessage } from '@components/ui/toast-message/InlineMessage';
import FormFrameWithFeatures from '@components/ui/form-utils/FormFrameWithFeatures';
import FormFieldMapping, { type FieldTypeProps } from '@components/ui/form-utils/FormFieldMapping';

const ProfileSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const translate = useTranslatedAttribute();
  const { isLoading, profile, initials, profileFeatures, profileTypeFeatures } = useProfile();
  const { processFiles } = useProcessFiles();
  const [editProfile, { error, isLoading: isEditting }] = useEditProfileMutation();

  const [avatar, setAvatar] = useState<FileList>();
  const [processingImage, setProcessingImage] = useState(false);

  const handleImageChange = async () => {
    if (!isEmpty(profile) && avatar) {
      setProcessingImage(true);
      const { first_name, last_name } = profile?.entity;

      const result = await processFiles(avatar);
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
        id: profile?.id,
        formData: requestData
      }).unwrap();

      dispatch(setCurrentUser({ image: get(updatedProfile?.data, 'image') }));
      setProcessingImage(false);
    }
  };

  const onSubmit = async (formData: any) => {
    try {
      const { first_name, last_name } = formData;
      const features = omit(formData, ['first_name', 'last_name']);

      const requestData = {
        first_name,
        last_name,
        features,
        profile_type: profile?.profile_type.id,
        attachments: profile?.attachments
      };

      await editProfile({
        id: profile?.id,
        formData: requestData
      }).unwrap();

      toastMessage(
        t('settings.profile_settings_update_success', 'Profile settings updated succesfully!'),
        'success'
      );
    } catch (error) {
      toastMessage(t('common.unexpected_error', 'An unexpected error occurred!'), 'danger');
    }
  };

  useEffect(() => {
    handleImageChange();
  }, [avatar]);

  return (
    <>
      <h3 className="d-none d-sm-block">{t('settings.profile', 'Profile settings')}</h3>
      <p className="mb-24 text-gray-300">
        {t(
          'settings.profile_description',
          'Here you can find information about your account and make changes'
        )}
      </p>
      {isLoading ? (
        <ProfileSettings.Skeleton />
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <ProfileImage
              isImageProcessing={isLoading || processingImage}
              isEditModeActive
              name={initials}
              image={get(profile?.image, 'thumb', get(profile?.image, 'source'))}
              size={16}
              setImages={setAvatar}
            />
          </div>

          <h4 className="fs-18 my-20">{t('settings.profile_personal_data', 'Personal data')}</h4>

          <FormFrameWithFeatures
            formType="editProfile"
            onSubmit={onSubmit}
            setOnlyRequiredFeatures={false}
            features={profileTypeFeatures ?? []}
            serverValidation={get(error, 'message')}>
            <div className="row row-cols-1 row-cols-lg-2 g-20">
              <div className="col">
                <FormField
                  name="first_name"
                  placeholder={t('common.name', 'Name')}
                  label={t('common.name', 'Name')}
                  value={profile?.entity?.first_name}
                />
              </div>
              <div className="col">
                <FormField
                  name="last_name"
                  placeholder={t('common.last_name', 'Last Name')}
                  label={t('common.last_name', 'Last Name')}
                  value={profile?.entity?.last_name}
                />
              </div>
              {map(profileTypeFeatures, (feature, index) => (
                <div key={feature?.id ?? index} className="col">
                  <FormFieldMapping
                    data-testid="edit-profile"
                    key={feature?.id}
                    id={feature?.id}
                    value={get(profile, `features[${feature.slug}]`, '')}
                    type={feature?.type as FieldTypeProps}
                    name={feature?.name}
                    slug={feature?.slug}
                    featureValues={feature.feature_values}
                    placeholder={translate(feature?.placeholder)}
                    label={translate(feature?.label)}
                  />
                </div>
              ))}
            </div>
            <div className="text-end">
              <FormSubmitButton
                title={t('common.save', 'Save')}
                className="btn btn-primary btn-xl mt-20"
                disabled={isEditting}
              />
            </div>
          </FormFrameWithFeatures>
        </>
      )}
    </>
  );
};

export default ProfileSettings;

ProfileSettings.Skeleton = () => (
  <div className="row g-16">
    <div className="d-flex justify-content-center">
      <Skeleton circle width={160} height={160} borderRadius={12} />
    </div>
    <Skeleton height={25} width={200} borderRadius={12} />

    <div className="row g-8">
      <div className="col-12 col-xl-6">
        <Skeleton height={50} borderRadius={12} />
      </div>
      <div className="col-12 col-xl-6">
        <Skeleton height={50} borderRadius={12} />
      </div>
    </div>

    <div className="row g-8">
      <div className="col-12 col-xl-6">
        <Skeleton height={50} borderRadius={12} />
      </div>
      <div className="col-12 col-xl-6">
        <Skeleton height={50} borderRadius={12} />
      </div>
    </div>

    <div className="row g-8">
      <div className="col-12 col-xl-6">
        <Skeleton height={50} borderRadius={12} />
      </div>
      <div className="col-12 col-xl-6">
        <Skeleton height={50} borderRadius={12} />
      </div>
    </div>
  </div>
);
