import React, { memo, useEffect } from 'react';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import map from 'lodash/map';

import { getValidationDefault } from '@utils/helpers';
import { useTranslation } from '@hooks/useTranslation';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import CustomSelect from '@components/ui/select-field/CustomSelect';

export interface FeatureValueProps {
  id: number;
  value: { [key: string]: string };
}

export interface SelectValueProps {
  feature_id: number;
  id: number;
  value: {
    [key: string]: string;
  };
}

interface FormFieldProps {
  id: number;
  name: string;
  featureValues: FeatureValueProps[];
  placeholder: string;
  value?: SelectValueProps;
  className?: string;
  serverValidation?: string | string[];
}

const FormSelectField = (props: FormFieldProps) => {
  const { t } = useTranslation();
  const translate = useTranslatedAttribute();
  const { id, name, featureValues, placeholder, className, serverValidation, value } = props;
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  const isInvalid = !!touched[name] && !!errors[name];
  const hasServerErrors = !isNil(serverValidation) && !isEmpty(serverValidation);

  const handleChange = (option: FeatureValueProps | null) => {
    setFieldValue(name, option?.id ?? '');
  };

  useEffect(() => {
    if (value) {
      setFieldValue(name, value.id);
    }
  }, []);

  return (
    <>
      <CustomSelect<FeatureValueProps, false>
        key={id}
        name={name}
        value={find(featureValues, ({ id }) => isEqual(id, values[name]))}
        onChange={handleChange}
        options={featureValues}
        getOptionLabel={({ value }) => translate(value)}
        getOptionValue={({ id }) => String(id)}
        placeholder={placeholder}
        isClearable={true}
        className={classNames(`${className}`, {
          invalid: isInvalid || hasServerErrors
        })}
      />
      {(isInvalid || hasServerErrors) && (
        <div className="d-block mt-n16 mb-20 invalid-feedback" data-testid="invalid-feedback">
          {isInvalid && (
            <span className="me-4">
              {t(errors[name] as string, getValidationDefault(errors[name] as string))}
            </span>
          )}
          {hasServerErrors &&
            map(serverValidation, (error, key) => (
              <span key={key} className="me-4">
                {isObject(error) ? translate(error) : error}
              </span>
            ))}
        </div>
      )}
    </>
  );
};

export default memo(FormSelectField);
