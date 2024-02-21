import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import map from 'lodash/map';
import get from 'lodash/get';
import set from 'lodash/set';
import omit from 'lodash/omit';
import Skeleton from 'react-loading-skeleton';

import type { ProfileFeature } from '@freya/types/profile';

import { useTranslation } from '@hooks/useTranslation';
import { useProcessFiles } from '@hooks/useProcessFiles';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { useVisitMyProfile } from '@hooks/useVisitMyProfile';
import { getImage } from '@utils/helpers';
import {
  useGetCurrentProfileQuery,
  useEditProfileMutation,
  useGetProfileTypeQuery
} from '@store/api/profileApi';
import { setCurrentUser } from '@store/currentUserSlice';

import FormField from '@components/ui/form-utils/FormField';
import ProfileImage from '@components/profile/ProfileImage';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';
import FormFieldMapping from '@components/ui/form-utils/FormFieldMapping';
import FormFrameWithFeatures from '@components/ui/form-utils/FormFrameWithFeatures';
import type { FieldTypeProps } from '@components/ui/form-utils/FormFieldMapping';

const EditProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { processFiles } = useProcessFiles();
  const [editProfile, { error }] = useEditProfileMutation();
  const [images, setImages] = useState<FileList>();
  const [isImageProcessing, setImageProcessing] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const translate = useTranslatedAttribute();
  const { goToMyProfile } = useVisitMyProfile();

  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);

  const { data: profileType, isFetching: isProfileTypeFetching } = useGetProfileTypeQuery({
    id: currentUser?.profile_type?.id,
    entity: 'user'
  });

  const { data: profile, isFetching: isCurrentProfileFetching } = useGetCurrentProfileQuery({
    id: currentUser?.id
  });

  const features = profileType ? (profileType?.features as ProfileFeature[]) : [];
  const isMyAccount = currentUser?.id === profile?.data?.id;
  const nameInitials =
    profile?.data?.entity?.first_name && profile?.data?.entity?.last_name
      ? `${profile?.data?.entity?.first_name[0]}${profile?.data?.entity?.last_name[0]}`
      : null;

  const handleStepBack = useCallback(() => {
    navigate(`/profile/${currentUser?.id}/${currentUser?.slug}`);
  }, []);

  const onSubmit = useCallback(
    async (formData: any) => {
      const { first_name, last_name } = formData;

      try {
        const features = omit(formData, ['first_name', 'last_name']);

        let requestData = {
          first_name,
          last_name,
          features: features,
          profile_type: profile?.data?.profile_type.id,
          attachments: profile?.data?.attachments
        };

        set(requestData, 'image', previewImage);

        const updatedProfile = await editProfile({
          id: currentUser?.id,
          formData: requestData
        }).unwrap();

        dispatch(setCurrentUser({ image: get(updatedProfile?.data, 'image') }));
        goToMyProfile();
      } catch (error: any) {}
    },
    [currentUser, profile, previewImage]
  );

  const handleProcessImages = async () => {
    setImageProcessing(true);

    const result = await processFiles(images!);
    const imagePath = get(result[0], 'path');

    setPreviewImage(imagePath ?? '');
    setImageProcessing(false);
  };

  useEffect(() => {
    handleProcessImages();
  }, [images]);

  return (
    <>
      <div className="width-md-75 m-auto">
        {!profile ? (
          <EditProfileSkeleton />
        ) : (
          <>
            <h3 className="d-block my-24">
              {t('profile.personal_information', 'Personal information')}
            </h3>
            <div className="d-flex justify-content-center justify-content-md-start align-items-center flex-wrap flex-md-nowrap gap-48">
              <ProfileImage
                isEditModeActive={isMyAccount}
                size={24}
                className="flex-shrink-0 fs-64 fw-bold"
                image={previewImage ? previewImage : getImage(profile?.data?.image, 'thumb')}
                name={nameInitials ?? ''}
                isImageProcessing={isImageProcessing}
                setImages={setImages}
              />
              <p>{t('profile.description', 'Please fill in your profile information.')}</p>
            </div>
            <div className="mt-36">
              {isCurrentProfileFetching || isProfileTypeFetching || isImageProcessing ? (
                <div className="text-center p-48">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <FormFrameWithFeatures
                  formType="editProfile"
                  onSubmit={onSubmit}
                  setOnlyRequiredFeatures={false}
                  features={features}
                  serverValidation={get(error, 'message')}>
                  <div className="row row-cols-1 row-cols-lg-2 g-20">
                    <div className="col">
                      <FormField
                        name="first_name"
                        placeholder={t('common.name', 'Name')}
                        label={t('common.name', 'Name')}
                        value={profile?.data?.entity?.first_name}
                      />
                    </div>
                    <div className="col">
                      <FormField
                        name="last_name"
                        placeholder={t('common.last_name', 'Last Name')}
                        label={t('common.last_name', 'Last Name')}
                        value={profile?.data?.entity?.last_name}
                      />
                    </div>
                    {map(features, (feature, index) => (
                      <div key={feature?.id ?? index} className="col">
                        <FormFieldMapping
                          data-testid="edit-profile"
                          key={feature?.id}
                          id={feature?.id}
                          value={get(profile, `data.features[${feature.slug}]`, '')}
                          type={feature?.type as FieldTypeProps}
                          name={feature?.name}
                          slug={feature?.slug}
                          featureValues={feature.feature_values}
                          placeholder={translate(feature?.placeholder)}
                          label={translate(feature?.label)}
                          className="mb-20"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="d-flex width-100 justify-content-between justify-content-md-end flex-wrap gap-20 my-36">
                    <button
                      onClick={handleStepBack}
                      className="btn btn-xl btn-outline-primary"
                      data-testid="cancel-edit-profile-button">
                      {t('common.cancel', 'Cancel')}
                    </button>
                    <FormSubmitButton
                      title={t('common.save', 'Save')}
                      className="btn btn-primary btn-xl"
                      disabled={false}
                    />
                  </div>
                </FormFrameWithFeatures>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditProfile;

const EditProfileSkeleton = () => (
  <>
    <div className="row mb-36">
      <Skeleton height={40} borderRadius={12} width={320} />
    </div>
    <div className="d-flex justify-content-center justify-content-md-start align-items-center flex-wrap flex-md-nowrap gap-48">
      <Skeleton circle width={240} height={240} />
      <Skeleton
        height={40}
        containerClassName="flex-fill width-100 width-md-auto"
        borderRadius={12}
      />
    </div>
    <div className="row row-cols-1 row-cols-lg-2 g-20 mt-16">
      <div className="col">
        <Skeleton height={48} borderRadius={12} />
      </div>
      <div className="col">
        <Skeleton height={48} borderRadius={12} />
      </div>
      <div className="col">
        <Skeleton height={48} borderRadius={12} />
      </div>
      <div className="col">
        <Skeleton height={48} borderRadius={12} />
      </div>
    </div>
    <div className="d-flex justify-content-end mt-48 mb-36">
      <Skeleton width={150} height={48} borderRadius={80} className="me-16" />
      <Skeleton width={150} height={48} borderRadius={80} />
    </div>
  </>
);
