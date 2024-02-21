import React, { useState } from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import Skeleton from 'react-loading-skeleton';

import { useTranslation } from '@hooks/useTranslation';
import { useGetOrdersHistoryQuery } from '@store/api/productsApi';

import ContentFrame from '@components/ui/frames/ContentFrame';
import BasicPagination from '@components/ui/pagination/BasicPagination';
import OrderHistoryItem from '@components/orders-history/OrderHistoryItem';

const ProfileOrdersHistory = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: ordersResponse, isFetching } = useGetOrdersHistoryQuery({
    page: currentPage
  });

  const orders = ordersResponse?.data ?? [];
  const meta = ordersResponse?.meta;

  const onPageChange = (
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <ContentFrame
      className="p-20 p-lg-40 mb-32"
      contentVisible={!!orders && !isEmpty(orders)}
      isLoading={isFetching}
      Header={
        <h3 className="mb-20">{t('common.tabs_profile_orders_history', 'Orders history')}</h3>
      }
      LoadingSkeleton={
        <>
          <Skeleton width={250} height={40} className="mb-16" borderRadius={12} />
          <OrderHistoryItem.Skeleton count={3} />
        </>
      }>
      <>
        <div className="d-flex flex-column gap-12">
          {map(orders, (order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </div>
        {meta?.last_page && meta?.last_page > 1 && (
          <div className="mt-20">
            <BasicPagination clickHandler={onPageChange} meta={meta} />
          </div>
        )}
      </>
    </ContentFrame>
  );
};

export default ProfileOrdersHistory;
