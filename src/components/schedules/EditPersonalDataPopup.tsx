import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import get from 'lodash/get';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

import type { Meeting, ParticipantInfoProps } from '@freya/types/meeting';
import { useTranslation } from '@hooks/useTranslation';

import { Popup } from '@components/ui/popup/Popup';
import FormFrame from '@components/ui/form-utils/FormFrame';
import FormField from '@components/ui/form-utils/FormField';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';

interface PersonalDataModalProps {
  meeting: Meeting;
  handleToggleModalState: () => void;
  handleOnSubmit: (formData: ParticipantInfoProps) => {};
  isEditModalOpen: boolean;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  size: 'sm' | 'lg' | 'xl';
}

const EditPersonalDataPopup = (props: PersonalDataModalProps) => {
  const {
    meeting,
    handleOnSubmit,
    handleToggleModalState,
    isEditModalOpen,
    isLoading,
    error,
    size
  } = props;
  const { t } = useTranslation();

  return (
    <Popup
      size={size}
      onHide={handleToggleModalState}
      title={t('schedules.details_page_personal_data', 'Personal data')}
      body={
        <FormFrame
          formType="edit_meeting_patient_info"
          serverValidation={isEmpty(get(error, 'errors', [])) ? get(error, 'message') : ''}
          onSubmit={handleOnSubmit}>
          <div className="row row-cols-1 row-cols-md-2 g-20">
            {map(['title', 'email', 'address', 'phone'], (field: string) => (
              <div key={field} className="col">
                <FormField
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={get(meeting?.profile_participant?.personal_info, field)}
                  placeholder={t(`schedules.details_page_personal_info_${field}`, field)}
                  label={t(`schedules.details_page_personal_info_${field}`, field)}
                  serverValidation={get(error, `errors.${field}`, [])}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-32">
            <FormSubmitButton
              className="btn btn-primary btn-lg width-100 width-md-50"
              title={t('common.save', 'Save')}
              loading={isLoading}
              disabled={!isUndefined(error)}
            />
          </div>
        </FormFrame>
      }
      show={isEditModalOpen}
    />
  );
};

export default EditPersonalDataPopup;
