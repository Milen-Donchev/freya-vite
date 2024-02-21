import React from 'react';
import { Spinner, type SpinnerProps } from 'react-bootstrap';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  spinnerProps?: SpinnerProps;
}

const LoadingButton = (props: LoadingButtonProps) => {
  const { loading, children, className, spinnerProps, ...rest } = props;

  return (
    <button className={className} {...rest}>
      {loading && (
        <Spinner
          as="span"
          role="status"
          variant="gray"
          animation="border"
          size="sm"
          className="me-8"
          {...spinnerProps}
        />
      )}
      {children}
    </button>
  );
};

export default LoadingButton;
