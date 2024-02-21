import React from 'react';
import { useFormikContext } from 'formik';

import LoadingButton from '../buttons/LoadingButton';

interface FormSumbitButtonProps {
  title: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: (formData?: any) => void;
}

const FormSubmitButton = (props: FormSumbitButtonProps) => {
  const { title, className, children, disabled, loading, onClick } = props;
  const { handleSubmit } = useFormikContext<any>();

  const handleSubmitForm = () => {
    if (onClick) {
      onClick();
    }
    handleSubmit();
  };

  return (
    <LoadingButton
      data-testid="form-submit-button"
      type="submit"
      loading={loading}
      className={className}
      disabled={disabled}
      onClick={handleSubmitForm as any}>
      {title} {children}
    </LoadingButton>
  );
};

export default FormSubmitButton;
