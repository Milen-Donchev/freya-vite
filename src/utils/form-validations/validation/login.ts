import * as Yup from 'yup';
import { ValidationErrors } from '@models/ValidationErrors';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^\+\d{1,3}\d{6,12}$/;

export const loginSchema = Yup.object().shape({
  identity: Yup.string()
    .required(ValidationErrors.REQUIRED.key)
    .test('identity', ValidationErrors.INVALID_IDENTITY.key, (value) => {
      const validEmail = !!value && EMAIL_REGEX.test(value);
      const validPhone = !!value && PHONE_REGEX.test(value);
      return validEmail || validPhone;
    }),
  password: Yup.string().required(ValidationErrors.REQUIRED.key)
});

export const loginValues = {
  identity: '',
  password: ''
};
