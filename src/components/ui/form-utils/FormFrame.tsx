import React from 'react';
import type { ReactNode } from 'react';
import { Formik } from 'formik';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

import { getValidation, type FormType } from '@utils/form-validations/validation';

import InlineMessage from '@components/ui/toast-message/InlineMessage';

export interface CommonSchema {
  first_name: RequiredStringSchema<string | undefined, AnyObject>;
  last_name: RequiredStringSchema<string | undefined, AnyObject>;
  [key: string]: RequiredStringSchema<string | undefined, AnyObject>;
}
interface FormFrameProps {
  children: ReactNode;
  formType: FormType;
  onSubmit: (...args: any) => any;
  serverValidation?: string;
}

const FormFrame = (props: FormFrameProps) => {
  const { formType, onSubmit, children, serverValidation } = props;
  const { schema, values } = getValidation(formType);

  return (
    <>
      <Formik initialValues={values} validationSchema={schema} onSubmit={onSubmit}>
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

export default FormFrame;
