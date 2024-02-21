import * as Yup from 'yup';
import { ValidationErrors } from '@models/ValidationErrors';

export const instantCheckoutSchema = Yup.object().shape({
  first_name: Yup.string().required(ValidationErrors.REQUIRED.key),
  last_name: Yup.string().required(ValidationErrors.REQUIRED.key),
  address: Yup.string().required(ValidationErrors.REQUIRED.key),
  ucn: Yup.string().required(ValidationErrors.REQUIRED.key),
  card_payment: Yup.boolean()
    .required(ValidationErrors.REQUIRED.key)
    .oneOf([true], ValidationErrors.REQUIRED.key),
  gdpr_agreement: Yup.boolean()
    .required(ValidationErrors.REQUIRED.key)
    .oneOf([true], ValidationErrors.ACCEPT_THE_TERMS.key),
  terms_agreement: Yup.boolean()
    .required(ValidationErrors.REQUIRED.key)
    .oneOf([true], ValidationErrors.ACCEPT_THE_TERMS.key)
});

export const instantCheckoutValues = {
  first_name: '',
  last_name: '',
  address: '',
  ucn: '',
  card_payment: true,
  gdpr_agreement: false,
  terms_agreement: false
};
