import * as Yup from 'yup';

export const commonRegistrationStepThreeSchema = {
  condition01: Yup.boolean().required('Задължително поле'),
  condition02: Yup.boolean().required('Задължително поле'),
  condition03: Yup.boolean().required('Задължително поле'),
  condition04: Yup.boolean().required('Задължително поле')
};

export const registrationStepThreeSchema = Yup.object().shape({
  ...commonRegistrationStepThreeSchema
});

export const registrationStepThreeValues = {
  condition01: true,
  condition02: true,
  condition03: true,
  condition04: true
};
