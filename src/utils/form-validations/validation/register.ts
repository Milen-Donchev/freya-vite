import * as Yup from 'yup';
import { ValidationErrors } from '@models/ValidationErrors';
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PHONE_REGEX = /^(0|[+359])[1-9]\d{8,12}$/;
export const PASSWORD_REGEX_UPPERCASE_LOWERCASE_LETTER = /(?=.*?[A-Z])(?=.*?[a-z])/;
export const PASSWORD_REGEX_NUMBER = /(?=.*?[0-9])/;

export const commonAuthSchema = {
  identity: Yup.string()
    .required(ValidationErrors.REQUIRED.key)
    .test('identity', ValidationErrors.INVALID_IDENTITY.key, (value) => {
      const validEmail = !!value && EMAIL_REGEX.test(value);
      const validPhone = !!value && PHONE_REGEX.test(value);
      return validEmail || validPhone;
    }),
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
    .oneOf([Yup.ref('password'), null], ValidationErrors.PASSWORDS_MUST_MATCH.key),
  terms: Yup.boolean()
    .required(ValidationErrors.REQUIRED.key)
    .oneOf([true], ValidationErrors.ACCEPT_THE_TERMS.key)
};

export const registerSchema = Yup.object().shape({
  ...commonAuthSchema
});

export const registerValues = {
  identity: '',
  password: '',
  password_confirmation: '',
  terms: false
};
