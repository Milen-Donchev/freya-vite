import React from 'react';

import type { HomeMainSection } from '@types';

import { useAuthStatus } from '@hooks/useAuthStatus';

import LoginForm from '../login/LoginForm';
import RegisterForm from '../register/RegisterForm';
import TitleAndDescription from './TitleAndDescription';
interface MainHomeSectionProps {
  data: HomeMainSection;
}

const HomeMain = (props: MainHomeSectionProps) => {
  const { data } = props;
  const { image, colors, form, title, description } = data;
  const { isGuestLoginAllowed } = useAuthStatus();

  return (
    <section className={`py-48 bg-${colors.background}`}>
      <div className="container">
        <div className="row g-24 g-lg-48">
          <div
            className={`${
              isGuestLoginAllowed
                ? 'd-flex flex-column-reverse flex-lg-row-reverse gap-48'
                : 'col-12 col-lg-7'
            }`}>
            <TitleAndDescription
              title={title}
              description={description}
              colors={colors}
              isMainSection={true}
            />
            <div data-testid="main-section-bg-image">
              <img className="img-fluid" src={image} alt="media_alt" />
            </div>
          </div>
          {!isGuestLoginAllowed && (
            <div className="col-12 col-lg-5">
              <div className="bg-white rounded-4 p-48 shadow-sm">
                {form === 'login' ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeMain;
