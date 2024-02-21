import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '@hooks/useTranslation';
import { Link, useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { getImage } from '@utils/helpers';

import Avatar from '@components/ui/avatar/Avatar';

interface MobileMenuProfileCardProps {
  toggleBurgerMenu: () => void;
}

const MobileMenuProfileCard = (props: MobileMenuProfileCardProps) => {
  const { t } = useTranslation();
  const { toggleBurgerMenu } = props;
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${Routes.BASE_PROFILE}/${currentUser?.id}/${currentUser?.slug}`);
    toggleBurgerMenu();
  };

  return (
    <>
      {currentUser && (
        <div
          className="p-20 cursor-pointer"
          onClick={handleClick}
          data-testid="mobile-menu-profile">
          <div className="d-flex align-items-center border-bottom pb-20">
            <Avatar image={getImage(currentUser?.image, 'thumb')} />
            <div className="ms-16">
              <p className="fw-semibold text-primary-600 mb-0">{currentUser.title}</p>
              <p className="mb-0 text-gray-300 fs-12">
                {t('profile.see_your_profile', 'Go to your profile')}
              </p>
            </div>
          </div>
        </div>
      )}
      {!currentUser && (
        <div className="p-20">
          <div className="border-bottom pb-20 text-center">
            <p className="fs-14">{t('profile.menu_link_login', 'Login or Register')}</p>
            <Link to={Routes.LOGIN} className="btn btn-outline-primary">
              {t('common.login_or_register', 'Login / Registration')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenuProfileCard;
