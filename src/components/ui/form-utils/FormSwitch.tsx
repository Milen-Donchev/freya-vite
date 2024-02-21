import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from '@hooks/useTranslation';

import { getValidationDefault } from '@utils/helpers';

interface FormCheckboxFieldProps {
  id: string;
  name: string;
  defaultChecked?: boolean;
  label?: string;
  className?: string;
}

const FormSwitch = (props: FormCheckboxFieldProps) => {
  const { t } = useTranslation();
  const { id, name, label, className, defaultChecked } = props;

  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<any>();

  const isInvalid = !!touched[name] && !!errors[name];

  return (
    <div className={`${className} form-check form-switch`}>
      <input
        id={id}
        name={name}
        value={values[name]}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        className={`${className} form-check-input`}
        type="checkbox"
        role="switch"
        defaultChecked={defaultChecked}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
      {isInvalid && (
        <div className="invalid-feedback width-100">
          {t(errors[name] as string, getValidationDefault(errors[name] as string))}
        </div>
      )}
    </div>
  );
};

export default FormSwitch;
