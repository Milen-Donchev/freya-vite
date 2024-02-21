import { loginSchema, loginValues } from './validation/login';
import { forgottenPasswordSchema, forgottenPasswordValues } from './validation/forgotten-password';
import { registerSchema, registerValues } from './validation/register';
import {
  registrationWizardSchema,
  registrationWizardValues
} from './validation/registration-wizard';
import {
  registrationStepThreeSchema,
  registrationStepThreeValues
} from './validation/registration-step-three';
import { editProfileSchema, editProfileValues } from './validation/editProfile';
import {
  resetPasswordSchema,
  resetPasswordValues
} from '@utils/form-validations/validation/reset-password';

import {
  cookiePopupSchema,
  cookiePopupValues
} from '@utils/form-validations/validation/cookie-pop-up';

import { instantCheckoutSchema, instantCheckoutValues } from './validation/instant-checkout';
import {
  editMeetingPatientInfoSchema,
  editMeetingPatientInfoValues
} from '@utils/form-validations/validation/edit_meeting_patient_info';

export type FormType =
  | 'login'
  | 'forgottenPassword'
  | 'resetPassword'
  | 'register'
  | 'registration_wizard'
  | 'registration_step_three'
  | 'editProfile'
  | 'cookie_popup'
  | 'instant_checkout'
  | 'edit_meeting_patient_info';

let validation = {
  login: {
    schema: loginSchema,
    values: loginValues
  },
  register: {
    schema: registerSchema,
    values: registerValues
  },
  forgottenPassword: {
    schema: forgottenPasswordSchema,
    values: forgottenPasswordValues
  },
  resetPassword: {
    schema: resetPasswordSchema,
    values: resetPasswordValues
  },
  registration_wizard: {
    schema: registrationWizardSchema,
    values: registrationWizardValues
  },
  registration_step_three: {
    schema: registrationStepThreeSchema,
    values: registrationStepThreeValues
  },
  editProfile: {
    schema: editProfileSchema,
    values: editProfileValues
  },
  cookie_popup: {
    schema: cookiePopupSchema,
    values: cookiePopupValues
  },
  instant_checkout: {
    schema: instantCheckoutSchema,
    values: instantCheckoutValues
  },
  edit_meeting_patient_info: {
    schema: editMeetingPatientInfoSchema,
    values: editMeetingPatientInfoValues
  }
};

export const getValidation = (formType: FormType) => {
  return validation[formType];
};
