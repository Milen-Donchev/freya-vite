import React, { memo } from 'react';
import { configGet } from '@freya/config';
import { registrationLogo } from './registration.scss';

interface RegistrationLogoProps {
  className?: string;
}

const RegistrationLogo = (props: RegistrationLogoProps) => {
  const { className } = props;
  const logo = configGet('logo');

  return (
    <div className={`${className} text-md-center`}>
      <img src={logo} alt="logo" className={registrationLogo} loading="lazy" />
    </div>
  );
};

export default memo(RegistrationLogo);
