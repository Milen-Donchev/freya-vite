import * as Yup from 'yup';
import { ValidationErrors } from '@models/ValidationErrors';

export const commonRegistrationWizardSchema = {
  first_name: Yup.string().required(ValidationErrors.REQUIRED.key),
  last_name: Yup.string().required(ValidationErrors.REQUIRED.key)
};

export const registrationWizardSchema = Yup.object().shape({
  ...commonRegistrationWizardSchema
});

export const registrationWizardValues = {
  first_name: '',
  last_name: ''
};
