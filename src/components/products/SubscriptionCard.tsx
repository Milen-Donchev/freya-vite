import React from 'react';
import map from 'lodash/map';
import classNames from 'classnames';

import type { Subscription } from '@types';

import CardFrame from '../ui/frames/CardFrame';

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard = (props: SubscriptionCardProps) => {
  const { subscription } = props;

  const { image, title, description, features, price, pricePer, banner, onClick, isActive } =
    subscription;

  return (
    <div
      className={classNames('col bg-gray-100 mw-450 cursor-pointer', {
        'border border-2 border-primary-400 rounded-3': isActive
      })}>
      <CardFrame className="height-100">
        <div className="mb-24 px-40 pt-40 text-center">
          <img
            src={image}
            alt="subscription-banner"
            className="object-fit-contain width-24 height-16"
          />
        </div>

        <div className="d-flex flex-column width-100 justify-content-center align-items-center mb-24 px-40">
          <p className="fs-24 fw-bold">{title}</p>
          <p className="fs-14 text-gray-300 text-center mb-0">{description}</p>
        </div>

        <div className="mb-24 px-40 flex-fill">
          {map(features, (feature, i) => (
            <div key={String(i)} className="d-flex gap-12">
              <i className="fa-solid fa-circle fs-12 pt-4 text-primary-500" />
              <p className="fw-semibold fs-14">{feature}</p>
            </div>
          ))}
        </div>

        <p className="fs-24 fw-bold text-center mb-0">{price}</p>
        {pricePer && <p className="fs-14 fw-semibold text-gray-300 text-center mb-0">{pricePer}</p>}

        <div
          onClick={onClick}
          className={classNames(
            'py-8 my-28 text-center',
            { 'bg-primary-400 text-white': isActive && !onClick },
            { 'bg-primary-200 text-primary-500': !isActive && !onClick }
          )}>
          {banner && !onClick && <div className="fw-semibold text-center">{banner}</div>}
          {onClick && <div className="btn btn-outline-primary-400">{banner}</div>}
        </div>
      </CardFrame>
    </div>
  );
};

export default SubscriptionCard;
