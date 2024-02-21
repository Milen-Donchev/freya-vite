import React, { useState } from 'react';
import { Accordion, useAccordionButton, Tooltip, OverlayTrigger, Dropdown } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { format, parseISO } from 'date-fns';
import classNames from 'classnames';
import map from 'lodash/map';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import type { Order } from '@freya/types/products';

import { useTranslation } from '@hooks/useTranslation';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { useRequestOrderRefundMutation } from '@store/api/productsApi';

import { toastMessage } from '@components/ui/toast-message/InlineMessage';

interface OrderHistoryItemProps {
  order: Order;
}

const CustomToggle = ({ eventKey, isActive }: any) => {
  const expandBody = useAccordionButton(eventKey);

  return (
    <button
      className="position-absolute top-0 end-0 m-8 m-lg-0 position-lg-relative btn btn-icon btn-ghost-primary btn-lg"
      onClick={expandBody}>
      <i
        className={classNames('fa-light fs-24', {
          'fa-circle-chevron-down': !isActive,
          'fa-circle-chevron-up': isActive
        })}></i>
    </button>
  );
};

const OrderHistoryItem = ({ order }: OrderHistoryItemProps) => {
  const { id, created_at, can_refund, order_refund, documents, total_formatted, status, products } =
    order;

  const { t } = useTranslation();
  const translate = useTranslatedAttribute();

  const [isCurrentEventKey, setIsCurrentEventKey] = useState(false);

  const [requestRefund, { isLoading }] = useRequestOrderRefundMutation();

  const handleSelect = (selectedKey: any) => {
    setIsCurrentEventKey(selectedKey === String(id));
  };

  const handleOrderCancel = async () => {
    try {
      const response = await requestRefund({ order_id: id }).unwrap();
      if (response?.message) {
        toastMessage(translate(response?.message), 'success');
      }
    } catch (error) {
      toastMessage(t('common.unexpected_error', 'An unexpected error occurred!'), 'danger');
    }
  };

  const hasPendingRefundOrder = order_refund?.status === 'pending';

  return (
    <>
      <Accordion onSelect={handleSelect}>
        <div
          className={classNames(
            'd-flex flex-column flex-lg-row align-items-lg-center gap-16 position-relative border border-primary-300 p-16 rounded-3',
            { 'border-bottom-0 rounded-bottom-0': isCurrentEventKey }
          )}
          key={String(id)}>
          <div className="d-flex align-items-center gap-16 flex-shrink-0">
            <div className="d-flex justify-content-center align-items-center align-self-center rounded-circle bg-primary-200 width-5 height-5 flex-shrink-0">
              <i className="fa-light fa-file-invoice-dollar fs-18 text-primary-600" />
            </div>
            <div className="width-lg-16 width-xl-24 flex-shrink-lg-0 me-32 me-lg-0">
              <p className="fw-semibold mb-0">{t('common.order_number', 'Order N:') + ' ' + id}</p>
              <p className="fs-12 text-gray-300 mb-0">
                {format(parseISO(created_at), 'yyyy.MM.dd')}
              </p>
            </div>
          </div>
          <div className="width-lg-9 flex-shrink-0">
            <p className="fs-12 me-8 me-lg-0 text-gray-300 mb-0">{t('common.price', 'Price')}</p>
            <p className="fw-bold mb-0">{total_formatted}</p>
          </div>
          <div className="flex-shrink-0">
            <p className="fs-12 me-8 me-lg-0 text-gray-300 mb-0">{t('common.status', 'Status')}</p>
            <span
              className="badge rounded-pill text-white"
              style={{ backgroundColor: status.color }}>
              {translate(status.title)}
            </span>
          </div>
          <div className="d-flex align-items-center align-self-center justify-content-end flex-wrap gap-16 width-100">
            {can_refund && (
              <button
                disabled={isLoading || hasPendingRefundOrder}
                onClick={handleOrderCancel}
                className="btn btn-outline-primary width-100 width-lg-auto">
                {t('order.cancel_order', 'Cancel')}
              </button>
            )}
            {hasPendingRefundOrder && (
              <OverlayTrigger
                placement="top"
                overlay={(props) => (
                  <Tooltip id="pending-order-tooltip" {...props}>
                    {t('order.pending_refund', 'Refund request awaits approval')}
                  </Tooltip>
                )}>
                <div className="btn btn-outline-warning btn-icon">
                  <i className="fa-light fa-hourglass text-warning" />
                </div>
              </OverlayTrigger>
            )}
            {documents && !isEmpty(documents) && (
              <Dropdown className="dropdown width-100 width-lg-auto">
                <Dropdown.Toggle
                  id="order-documents-dropdown-toggle"
                  className="btn btn-primary width-100 width-lg-auto">
                  {t('common.download', 'Download')}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu width-100 width-lg-auto">
                  {map(documents, (doc) => (
                    <Dropdown.Item key={doc.number} as="a" target="_blank" href={doc.route}>
                      {translate(doc.type_title)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <CustomToggle eventKey={String(id)} isActive={isCurrentEventKey} />
          </div>
        </div>
        <Accordion.Collapse eventKey={String(id)}>
          <div className="border border-primary-300 border-top-0 px-16 pb-16 mt-n16 rounded-bottom-4 ps-lg-48">
            {map(products, (item) => (
              <div
                key={item.id}
                className={classNames(
                  'd-flex gap-16 flex-wrap justify-content-between justify-content-lg-start pt-16 mt-16 ms-lg-32',
                  {
                    'border-top border-primary-200': isCurrentEventKey
                  }
                )}>
                <div className="width-lg-16 width-xl-24 fw-semibold flex-shrink-0">
                  {translate(get(item, 'product.title'))}
                </div>
                <div className="width-lg-9 flex-shrink-0">
                  <p className="fw-bold mb-0">{item.total_formatted}</p>
                </div>
              </div>
            ))}
          </div>
        </Accordion.Collapse>
      </Accordion>
    </>
  );
};

OrderHistoryItem.Skeleton = function ({ count }: { count: number }) {
  return (
    <>
      {Array(count ?? 1)
        .fill('')
        .map((_, index) => (
          <Skeleton key={String(index)} borderRadius={20} height={100} className="my-8" />
        ))}
    </>
  );
};

export default OrderHistoryItem;
