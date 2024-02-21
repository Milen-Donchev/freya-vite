import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import map from 'lodash/map';
import omit from 'lodash/omit';
import get from 'lodash/get';

import type { ProfileType } from '@freya/types/profile';
import type { FieldTypeProps } from '@components/ui/form-utils/FormFieldMapping';

import { useTranslation } from '@hooks/useTranslation';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { setCurrentUser } from '@store/currentUserSlice';
import { useEditProfileMutation } from '@store/api/profileApi';

import RegistrationWizardHead from '@components/registration/registration-wizard/RegistrationWizardHead';
import RegistrationStepCounter from '@components/registration/registration-wizard/RegistrationStepCounter';
import FormFrameWithFeatures from '@components/ui/form-utils/FormFrameWithFeatures';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';
import FormFieldMapping from '@components/ui/form-utils/FormFieldMapping';
import FormField from '@components/ui/form-utils/FormField';
import BackwardButton from '@components/ui/buttons/BackwardButton';

interface RegistrationStepTwoProps {
  selectedProfileType: ProfileType | null;
  handleStepForward: () => void;
  handleStepBack: () => void;
}

const RegistrationStepTwo = (props: RegistrationStepTwoProps) => {
  const { t } = useTranslation();
  const translate = useTranslatedAttribute();
  const dispatch = useDispatch();
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);

  const { selectedProfileType, handleStepForward, handleStepBack } = props;

  const [editProfile] = useEditProfileMutation();

  const onSubmit = useCallback(async (formData: any) => {
    const { first_name, last_name } = formData;
    try {
      const features = omit(formData, ['first_name, last_name']);
      const requestData = {
        first_name,
        last_name,
        features: features,
        profile_type: selectedProfileType?.id
      };

      const { data: user } = await editProfile({
        id: currentUser.id,
        formData: requestData
      }).unwrap();

      if (user) {
        dispatch(setCurrentUser(user));
      }

      handleStepForward();
    } catch {}
  }, []);

  return (
    <FormFrameWithFeatures
      formType="registration_wizard"
      onSubmit={onSubmit}
      features={selectedProfileType?.features!}
      setOnlyRequiredFeatures={true}>
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <RegistrationStepCounter
          data-tesstid="registration-step-2-counter"
          stepNumber="2"
          title={t('common.info', 'Information')}
        />
        <RegistrationWizardHead
          title={t('register.profile_info', 'Profile information')}
          subTitle={t(
            'register.please_fill_profile_information',
            'Please fill in your profile information. This will make it easier for your colleagues and patients to find you.'
          )}
        />
        <div className="my-48">
          <FormField
            name="first_name"
            placeholder={t('common.name', 'Name')}
            label={t('common.name', 'Name')}
            className="mb-20"
          />
          <FormField
            name="last_name"
            placeholder={t('common.last_name', 'Last name')}
            label={t('common.last_name', 'Last name')}
            className="mb-20"
          />
          {map(selectedProfileType?.features, (feature) => {
            if (!feature.is_required) return;
            return (
              <FormFieldMapping
                data-testid="registration-form-field"
                key={feature.id}
                id={feature.id}
                type={feature.type as FieldTypeProps}
                name={feature.name}
                slug={feature.slug}
                featureValues={feature.feature_values}
                placeholder={translate(get(feature, 'label', {}))}
                label={translate(get(feature, 'label', {}))}
                className="mb-20"
              />
            );
          })}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center my-48">
        <div>
          <BackwardButton handleStepBack={handleStepBack} />
        </div>

        <FormSubmitButton title={t('common.next', 'Next')} className="btn btn-primary btn-xl">
          <i className="fa-light fa-circle-arrow-right ms-8" />
        </FormSubmitButton>
      </div>
    </FormFrameWithFeatures>
  );
};

export default memo(RegistrationStepTwo);
