import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

interface FormCheckboxFieldProps {
  id: string;
  name: string;
  label: ReactNode;
  serverValidation?: string | string[];
  value?: string | { [key: string]: string };
  type?: 'radio' | 'checkbox';
  className?: string;
  children?: ReactNode;
  defaultChecked?: boolean;
}

const FormCheckboxField = (props: FormCheckboxFieldProps) => {
  const {
    id,
    name,
    label,
    type = 'checkbox',
    className,
    serverValidation,
    children,
    value,
    defaultChecked
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
    <div className={`${className ?? ''} form-check`} data-testid="form-check">
      <input
        id={id}
        name={name}
        value={values[name] ?? get(initialValues, 'name', '')}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        type={type}
        defaultChecked={defaultChecked}
        className={classNames('form-check-input', { 'is-invalid': isInvalid || hasServerErrors })}
        data-testid="form-checkbox-input"
      />
      <label
        htmlFor={id}
        className={classNames('form-check-label', {
          'is-invalid': isInvalid || hasServerErrors
        })}
        data-testid="form-check-label">
        {label}
      </label>
    </div>
  );
};

export default FormCheckboxField;
