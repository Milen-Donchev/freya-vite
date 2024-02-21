export const ValidationErrors = {
  ACCEPT_THE_TERMS: {
    key: 'validation.terms_and_conditions',
    defaultTranslation: 'Please accept the terms and conditions.'
  },
  INVALID_FILE_TYPE: {
    key: 'validation.mimes',
    defaultTranslation: 'The file type is not accepted.'
  },
  MAX_FILE_SIZE: {
    key: 'validation.size_file',
    defaultTranslation: 'The size of the file exceeds the max file limit.'
  },
  PASSWORDS_MUST_MATCH: {
    key: 'validation.same',
    defaultTranslation: 'The passwords must match.'
  },
  PASSWORD_REQUIREMENTS_MIN_CHARS: {
    key: 'validation.min_string',
    defaultTranslation: 'The password must be at least 8 characters.'
  },
  PASSWORD_REQUIREMENTS_MAX_CHARS: {
    key: 'validation.max_string',
    defaultTranslation: 'The password must not be greater than 55 characters.'
  },
  PASSWORD_REQUIREMENTS_UPPERCASE_LOWERCASE_LETTER: {
    key: 'validation.password_mixed',
    defaultTranslation: 'The password must contain at least one uppercase and one lowercase letter.'
  },
  PASSWORD_REQUIREMENTS_NUMBER: {
    key: 'validation.password_numbers',
    defaultTranslation: 'The password must contain at least one number.'
  },
  REQUIRED: {
    key: 'validation.required',
    defaultTranslation: 'This field is required.'
  },
  INVALID_IDENTITY: {
    key: 'validation.identity',
    defaultTranslation:
      "Please enter a valid phone number which should include the country code and be between 8 and 14 digits in length starting with a '+' sign."
  },
  INVALID_EMAIL: {
    key: 'validation.email',
    defaultTranslation: 'Please provide a valid email address'
  }
};
