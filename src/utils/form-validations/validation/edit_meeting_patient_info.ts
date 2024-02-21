import * as Yup from 'yup';
import { ValidationErrors } from '@models/ValidationErrors';
import { EMAIL_REGEX, PHONE_REGEX } from '@freya/utils/form-validations/validation/register';

export const commonEditMeetingPatientInfoSchema = {
  title: Yup.string(),
  address: Yup.string(),
  email: Yup.string().matches(EMAIL_REGEX, {
    message: ValidationErrors.INVALID_EMAIL.key,
    excludeEmptyString: true
  }),
  phone: Yup.string().matches(PHONE_REGEX, {
    message: ValidationErrors.INVALID_IDENTITY.key,
    excludeEmptyString: true
  })
};

export const editMeetingPatientInfoSchema = Yup.object().shape({
  ...commonEditMeetingPatientInfoSchema
});

export const editMeetingPatientInfoValues = {
  title: '',
  email: '',
  address: '',
  phone: ''
};
