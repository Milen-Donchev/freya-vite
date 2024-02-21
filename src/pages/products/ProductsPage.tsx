import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Product } from '@freya/types/products';

import { Routes } from '@models/Routes';
import { useAuthStatus } from '@hooks/useAuthStatus';
import { useQueryParams } from '@hooks/useQueryParams';
import { useTranslation } from '@hooks/useTranslation';
import { useAddProductToCartMutation, useGetProductsQuery } from '@store/api/productsApi';

import AuthPopup from '@components/ui/popup/AuthPopup';
import ProductCard from '@components/products/ProductCard';
import HorizontalTabs from '@components/ui/tabs/HorizontalTabs';
import { toastMessage } from '@components/ui/toast-message/InlineMessage';

import empty from '@freya/assets/images/subscription-empty.svg';

const TABS = [
  {
    id: 1,
    key: 'subscriptions',
    title: 'common.tabs_subscriptions'
  },
  {
    id: 2,
    key: 'virtual_products',
    title: 'common.tabs_virtual_products'
  }
] as const;

const ProductsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getParam } = useQueryParams();
  const { isAuthenticated } = useAuthStatus();

  const sellableType = getParam('SELLABLE_TYPE');
  const sellableId = getParam('SELLABLE_ID');
  const permission = getParam('SELLABLE_PERMISSION');

  const [filterSelected, setFilterSelected] = useState<'subscriptions' | 'virtual_products'>(
    'subscriptions'
  );
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  const { data: products, isFetching } = useGetProductsQuery(
    {
      permission,
      sellableId,
      sellableType,
      subscriptionsOnly: filterSelected === 'subscriptions',
      virtualProductsOnly: filterSelected === 'virtual_products'
    },
    { refetchOnMountOrArgChange: true }
  );

  const [addProductToCart, { isLoading }] = useAddProductToCartMutation();

  const openAuthPopup = () => setIsAuthPopupOpen(true);
  const closeAuthPopup = () => setIsAuthPopupOpen(false);

  const onPurchaseClick = async (product: Product) => {
    if (!isAuthenticated) return openAuthPopup();
    try {
      await addProductToCart({ product });
      navigate(Routes.INSTANT_CHECKOUT);
    } catch (error) {
      toastMessage(t('common.unexpected_error', 'An unexpected error occurred!'), 'danger');
    }
  };

  return (
    <div className="height-100 mb-32">
      <div className="">
        <h3 className="">{t('products.products_page_title', 'Products')}</h3>
        <p className="">
          {t(
            'products.products_page_body',
            'Here You can find all of our available subscriptions and products, which unlock Premium features and permissions.'
          )}
        </p>
      </div>
      {/* FILTER TABS only shown when no route params are present */}
      {!sellableId && !sellableType && !permission && (
        <HorizontalTabs
          type="underlined"
          tabs={TABS}
          selectedTab={filterSelected}
          disabled={isFetching}
          setSelectedTab={setFilterSelected}
          className="gap-28"
        />
      )}
      <div className="row row-cols-xl-3 g-20 row-cols-lg-2 row-cols-1">
        {isFetching && <ProductCard.Skeleton count={3} />}
        {!isFetching &&
          !!products &&
          !isEmpty(products) &&
          map(products, (product) => (
            <div key={product.id} className="col">
              <ProductCard
                product={product}
                onPurchaseClick={() => onPurchaseClick(product)}
                disabled={isLoading}
              />
            </div>
          ))}
      </div>

      {!isFetching && (!products || isEmpty(products)) && (
        <div className="text-center mt-48">
          <img
            src={empty}
            alt="intro"
            className="align-self-center mb-28 mb-36 px-32 width-100 width-md-320"
            loading="lazy"
          />
          <p className="fs-18 fw-bold text-pre-wrap">
            {filterSelected === 'subscriptions'
              ? t('products.empty_subscriptions', 'No subscriptions found')
              : t('products.empty_virtual_products', 'No products found')}
          </p>
        </div>
      )}

      <AuthPopup isOpen={isAuthPopupOpen} onHide={closeAuthPopup} />
    </div>
  );
};

export default ProductsPage;
