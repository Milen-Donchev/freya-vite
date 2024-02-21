import * as Yup from 'yup';

export const commonEditProfileSchema = {
  first_name: Yup.string().required(),
  last_name: Yup.string().required()
};

export const editProfileSchema = Yup.object().shape({
  ...commonEditProfileSchema
});

export const editProfileValues = {
  first_name: '',
  last_name: ''
};
