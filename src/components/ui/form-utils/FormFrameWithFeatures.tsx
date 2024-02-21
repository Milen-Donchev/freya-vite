import React from 'react';
import type { ReactNode } from 'react';
import { Formik } from 'formik';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import map from 'lodash/map';
import * as Yup from 'yup';

import type { CommonSchema } from './FormFrame';
import type { ProfileFeature } from '@freya/types/profile';

import { ValidationErrors } from '@models/ValidationErrors';
import { getValidation, type FormType } from '@utils/form-validations/validation';

import InlineMessage from '@components/ui/toast-message/InlineMessage';

interface FormFrameWithFeaturesProps {
  children: ReactNode;
  formType: FormType;
  onSubmit: (...args: any) => any;
  features: ProfileFeature[];
  setOnlyRequiredFeatures?: boolean;
  serverValidation?: string;
}

const FormFrameWithFeatures = (props: FormFrameWithFeaturesProps) => {
  const { formType, onSubmit, children, serverValidation, features, setOnlyRequiredFeatures } =
    props;
  const { values } = getValidation(formType);

  let featuresData = features;

  if (setOnlyRequiredFeatures) {
    featuresData = filter(features, (feature) => feature.is_required);
  }

  let commonSchema: CommonSchema = {
    first_name: Yup.string().required(ValidationErrors.REQUIRED.key),
    last_name: Yup.string().required(ValidationErrors.REQUIRED.key)
  };

  let baseValidationSchema = {};
  let initialValues = { ...values };

  if (featuresData && featuresData?.length > 0) {
    map(featuresData, ({ slug, is_required }) => {
      if (is_required) {
        commonSchema = {
          ...commonSchema,
          [slug]: Yup.string().required(ValidationErrors.REQUIRED.key)
        };
      }
      Object.assign(initialValues, { [slug]: '' });
    });
  }

  baseValidationSchema = Yup.object().shape({
    ...commonSchema
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={baseValidationSchema}
        onSubmit={onSubmit}
        validateOnChange>
        {() => children}
      </Formik>
      {!isNil(serverValidation) && !isEmpty(serverValidation) && (
        <div className="my-24">
          <InlineMessage type="danger" message={serverValidation} />
        </div>
      )}
    </>
  );
};

export default FormFrameWithFeatures;
