import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import get from 'lodash/get';
import ReactHtmlParser from 'react-html-parser';

import { useTranslation } from '@hooks/useTranslation';
import { getValidationDefault } from '@utils/helpers';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

interface FormFieldProps {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  id?: string;
  serverValidation?: string | string[];
  className?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  autoComplete?: string;
}

const FormField = (props: FormFieldProps) => {
  const { t } = useTranslation();
  const translate = useTranslatedAttribute();
  const {
    name,
    type,
    id,
    serverValidation,
    placeholder = '',
    className,
    label,
    value,
    autoComplete = 'off'
  } = props;

  const { values, errors, touched, initialValues, setFieldValue, handleChange, handleBlur } =
    useFormikContext<any>();

  const isInvalid = !!touched[name] && !!errors[name];
  const hasServerErrors = !isNil(serverValidation) && !isEmpty(serverValidation);

  useEffect(() => {
    if (value) {
      setFieldValue(name, value);
    }
  }, []);

  return (
    <div className={`${className ? className : ''} form-floating`} data-testid="form">
      <input
        id={id}
        name={name}
        value={values[name] ?? get(initialValues, 'name', '')}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        type={type ?? 'text'}
        placeholder={label ? label : placeholder}
        className={classNames('form-control', {
          'is-invalid': isInvalid || hasServerErrors
        })}
        autoComplete={autoComplete}
        data-testid="form-input"
      />
      <label htmlFor={name}>{label}</label>
      <div className="invalid-feedback" data-testid="invalid-feedback">
        {isInvalid && (
          <span className="me-4">
            {ReactHtmlParser(
              t(errors[name] as string, getValidationDefault(errors[name] as string))
            )}
          </span>
        )}
        {hasServerErrors &&
          map(serverValidation, (error, key) => (
            <span key={key} className="me-4">
              {ReactHtmlParser(isObject(error) ? translate(error) : error)}
            </span>
          ))}
      </div>
    </div>
  );
};

export default FormField;
