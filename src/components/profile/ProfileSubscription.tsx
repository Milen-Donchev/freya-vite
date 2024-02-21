import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getImage } from '@utils/helpers';
import { useTranslation } from '@hooks/useTranslation';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { Routes } from '@freya/models/Routes';

import CardFrame from '@components/ui/frames/CardFrame';

import empty from './assets/subscription-empty.svg';

interface ProfileSubscriptionProps {
  profileId: number;
}

const ProfileSubscription = ({ profileId }: ProfileSubscriptionProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const translate = useTranslatedAttribute();
  // const {data: subscription} = useGetProfileSubscriptionQuery({});

  const onBrowseSubscription = () => navigate('/products');

  return (
    <CardFrame className="p-20 p-lg-40 mb-32">
      <h3 className="mb-20">{t('profile.subscription_title', 'Subscription')}</h3>
      {!subscription && (
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center px-20 my-20 gap-20">
          <img
            src={empty}
            alt="empty"
            className="object-fit-cover mw-lg-28 col-12 col-md-6 col-xl-4"
          />
          <div className="text-center col-xl-4 col-md-6 col-12">
            <h4 className="fs-24 fw-bold mb-12">
              {t('profile.no_subscription_header', 'No active subscription')}
            </h4>
            <p className="text-gray-300 mb-28">
              {t(
                'profile.no_subscription_description',
                'You currently have no active subscription. You can pick a subscription from the button below.'
              )}
            </p>
            <button
              role="button"
              onClick={onBrowseSubscription}
              className="btn btn-primary-500 btn-lg">
              {t('profile.subscription_choose', 'Browse subscriptions')}
            </button>
          </div>
        </div>
      )}

      {(!!subscription as any) && (
        <div className="d-flex flex-column align-items-center flex-lg-row gap-20 gap-lg-28 p-28 border border-1 border-primary-400 rounded-3">
          <div className="text-center flex-shrink-0">
            <img
              src={getImage(subscription.image)}
              alt="active-subscription"
              className="object-fit-cover width-10 height-10 rounded-3"
            />
          </div>
          <div className="text-center text-lg-start flex-grow-1">
            <p className="fs-24 fw-bold mb-0">
              {translate(subscription.title)}
              <Link to={Routes.PRODUCTS}>
                <i className="fa-light fa-circle-info text-primary ms-16"></i>
              </Link>
            </p>
            <p className="text-gray-400 mb-0">
              {t('profile.subscription_subtitle', 'More info about your subscription')}
            </p>
          </div>
          <div className="flex-shrink-0 text-center">
            <div>
              <h4 className="fw-bold mb-20">{subscription.price_formatted}</h4>
              <button className="btn btn-outline-primary-500 btn-lg">
                {t('profile.subscription_cancel', 'Cancel subscription')}
              </button>
            </div>
          </div>
        </div>
      )}
    </CardFrame>
  );
};

export default ProfileSubscription;

//const subscription: any = null;
const subscription = {
  id: 1,
  image: {
    small: 'https://picsum.photos/240/240',
    default: 'https://picsum.photos/240/240',
    source: 'https://picsum.photos/240/240',
    thumb: 'https://picsum.photos/240/240'
  },
  title: { en: 'My random subscription' },
  description: {
    en: '<p>This subscription gives you access to the special group of nothing. In there you can enjoy doing</p><ol><li>Nothing</li><li>Nothing but with 2</li><li>Nothing but with 3</li><li>You get it ...</li></ol>'
  },
  price_formatted: '24 $'
};
