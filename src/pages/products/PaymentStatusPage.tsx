import classNames from 'classnames';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { PaymentStatus } from '@models/Product';
import { useTranslation } from '@hooks/useTranslation';
import { useQueryParams } from '@hooks/useQueryParams';
import { useVisitMyProfile } from '@hooks/useVisitMyProfile';
import { useGetOrderPaymentStatusQuery } from '@store/api/productsApi';

import CardFrame from '@components/ui/frames/CardFrame';
import ProductCard from '@components/products/ProductCard';

import groupImage from '@freya/assets/images/subscription-popup.svg';

const PaymentStatusPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getParam } = useQueryParams();
  const { goToMyProfile } = useVisitMyProfile({
    withReplace: true,
    extraRoutes: '#orders_history'
  });

  const token = getParam('TOKEN');

  const {
    data: order,
    isFetching,
    error
  } = useGetOrderPaymentStatusQuery({
    token
  });

  const product = order?.products[0].product;
  const status = order?.status?.key;
  const orderNumber = order?.id;

  useEffect(() => {
    if (error && ((error as any).status === 500 || (error as any).status === 410)) {
      navigate('/products', { replace: true });
    }
  }, [error]);

  return (
    <div className="row g-28 mb-20">
      <div className="col-12 col-xl-8">
        {isFetching && <Skeleton baseColor="white" borderRadius={25} height={420} />}
        {order && !isFetching && (
          <CardFrame
            className={classNames('p-28 height-100', {
              'justify-content-center': status === PaymentStatus.CANCELLED
            })}>
            {status === PaymentStatus.SUCCESS && (
              <>
                <div className="my-20 text-center">
                  <i className="fa-light fa-badge-check text-success-400 fs-80"></i>
                </div>
                <p className="fs-36 fw-bold text-center">
                  {t('payment_status.successful_payment', 'Successful payment')}
                </p>
              </>
            )}
            {status === PaymentStatus.PENDING && (
              <>
                <div className="my-20 text-center">
                  <i className="fa-light fa-loader text-primary fs-80"></i>
                </div>
                <p className="fs-36 fw-bold text-center">
                  {t('payment_status.pending_payment', 'Pending payment')}
                </p>
              </>
            )}
            {status === PaymentStatus.CANCELLED && (
              <>
                <div className="my-20 text-center">
                  <i className="fa-light fa-circle-xmark text-danger-600 fs-80"></i>
                </div>
                <p className="fs-36 fw-bold text-center">
                  {t('payment_status.declined_payment', 'Declined payment')}
                </p>
              </>
            )}
            {(status === PaymentStatus.SUCCESS || status === PaymentStatus.PENDING) && (
              <>
                <div className="fs-18 text-center">
                  <span>
                    {t('common.order_number_check_details', {
                      defaultValue: `Order N: :order_number . Check details`,
                      order_number: orderNumber
                    })}
                    &nbsp;
                  </span>
                  <span onClick={goToMyProfile} className="text-primary fw-semibold cursor-pointer">
                    {t('payment_status.order_link', 'here')}
                  </span>
                </div>
                <div className="d-flex flex-column flex-lg-row gap-20 align-items-center p-20 border border-primary-400 rounded-3 mt-48">
                  <div className="col ratio ratio-16x9 text-center">
                    <img
                      src={groupImage}
                      alt="image"
                      className="img-fluid width-100 height-100 object-fit-contain"
                    />
                  </div>
                  <div className="col">
                    {t('payment_status.groups_description', 'Discover more')}
                  </div>
                  <div className="col text-center">
                    <Link to={Routes.DISCUSSIONS_LISTING} className="btn btn-primary btn-lg">
                      {t('payment_status.groups_cta', 'Groups')}
                    </Link>
                  </div>
                </div>
                <div className="d-flex width-100 width-lg-40 m-auto align-items-center gap-20 p-20 bg-primary-200 rounded-3 mt-40">
                  <div className="d-flex align-items-center justify-content-center flex-shrink-0 width-4 height-4 p-10 bg-primary-400 rounded-circle">
                    <i className="fa-light fa-envelope text-white fs-20"></i>
                  </div>
                  <p className="mb-0 flex-grow-1 align-self-center text-start fw-semibold">
                    {t('payment_status.email_reminder', 'Email reminder description')}
                  </p>
                </div>
              </>
            )}
            {status === PaymentStatus.CANCELLED && (
              <>
                <p className="fs-18 mb-0 text-center">
                  {t('payment_status.declined_subtitle', 'Declined')}
                </p>
                <div className="mt-40 text-center">
                  <Link to={Routes.DISCUSSIONS_LISTING} className="btn btn-primary btn-lg">
                    {t('payment_status.try_again', 'Try again')}
                  </Link>
                </div>
              </>
            )}
          </CardFrame>
        )}
      </div>
      <div className="col-12 col-xl-4">
        <div className="m-auto mw-md-450 mw-xl-unset">
          {isFetching ? (
            <ProductCard.Skeleton />
          ) : (
            product && <ProductCard product={product} preview />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
