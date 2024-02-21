import React from 'react';

import type { FeatureValueProps } from './FormSelectField';
import type { SelectValueProps } from './FormSelectField';

import FormField from './FormField';
import FormSelectField from './FormSelectField';
import FormCheckboxField from './FormCheckboxField';

export type FieldTypeProps = 'text' | 'checkbox' | 'select';

interface FormFieldMapping {
  id: number;
  type: FieldTypeProps;
  name: string;
  slug: string;
  label: string;
  featureValues: FeatureValueProps[];
  value?: string | SelectValueProps;
  placeholder?: string;
  className?: string;
}

const FormFieldMapping = (props: FormFieldMapping) => {
  const { id, type, placeholder, label, featureValues, slug, value, className = '' } = props;

  return (
    <>
      {type === 'text' && (
        <FormField
          name={slug}
          placeholder={placeholder ?? ''}
          label={label}
          value={value as string}
          className={`width-100 ${className}`}
        />
      )}
      {type === 'checkbox' && (
        <FormCheckboxField
          id={id.toString()}
          name={slug}
          label={label ?? ''}
          value={value as string}
          className={className}
        />
      )}
      {type === 'select' && (
        <FormSelectField
          id={id}
          key={id}
          featureValues={featureValues ?? []}
          name={slug}
          value={value as SelectValueProps}
          placeholder={placeholder || label}
          className={className}
        />
      )}
    </>
  );
};

export default FormFieldMapping;
