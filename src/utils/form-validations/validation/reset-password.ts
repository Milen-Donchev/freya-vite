import * as Yup from 'yup';
import { ValidationErrors } from '@models';
import {
  PASSWORD_REGEX_NUMBER,
  PASSWORD_REGEX_UPPERCASE_LOWERCASE_LETTER
} from '@utils/form-validations/validation/register';

export const resetPasswordSchema = Yup.object().shape({
  code: Yup.string().required(ValidationErrors.REQUIRED.key),
  password: Yup.string()
    .required(ValidationErrors.REQUIRED.key)
    .matches(
      PASSWORD_REGEX_UPPERCASE_LOWERCASE_LETTER,
      ValidationErrors.PASSWORD_REQUIREMENTS_UPPERCASE_LOWERCASE_LETTER.key
    )
    .matches(PASSWORD_REGEX_NUMBER, ValidationErrors.PASSWORD_REQUIREMENTS_NUMBER.key)
    .min(8, ValidationErrors.PASSWORD_REQUIREMENTS_MIN_CHARS.key)
    .max(55, ValidationErrors.PASSWORD_REQUIREMENTS_MAX_CHARS.key),
  password_confirmation: Yup.string()
    .required(ValidationErrors.REQUIRED.key)
    .oneOf([Yup.ref('password'), null], ValidationErrors.PASSWORDS_MUST_MATCH.key)
});

export const resetPasswordValues = {
  code: '',
  password: '',
  password_confirmation: ''
};
