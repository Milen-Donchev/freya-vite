import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@hooks/useTranslation';
import { useGetCartProductsQuery, useSubmitInstantCheckoutMutation } from '@store/api/productsApi';

import ProductCard from '@components/products/ProductCard';
import { toastMessage } from '@components/ui/toast-message/InlineMessage';
import InstantCheckoutForm from '@components/products/InstantCheckoutForm';

const InstantCheckoutPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isFetching, error } = useGetCartProductsQuery({});

  const [submitInstantCheckout] = useSubmitInstantCheckoutMutation();

  const product = data?.cart?.products[0]?.product;
  const cardPaymentId = data?.payment_methods[0]?.id;

  const handleSubmit = async (formData: any) => {
    try {
      const response = await submitInstantCheckout({
        address: {
          address: formData.address,
          full_name: formData.first_name + ' ' + formData.last_name,
          ucn: formData.ucn
        },
        has_agreed: formData.gdpr_agreement && formData.terms_agreement,
        payment_method_id: cardPaymentId!
      }).unwrap();
      if (response?.redirect_url) {
        window.location.replace(response.redirect_url);
      }
    } catch (error) {
      toastMessage(t('common.unexpected_error', 'An unexpected error occurred!'), 'danger');
    }
  };

  const handleCancel = () => navigate(-1);

  useEffect(() => {
    if (error && (error as any)?.status === 404) {
      navigate('/products', { replace: true });
    }
  }, [error]);

  return (
    <div className="row g-20 mb-20">
      <div className="col-12 col-xl-8">
        {isFetching && <InstantCheckoutForm.Skeleton />}
        {!isFetching && <InstantCheckoutForm onSubmit={handleSubmit} onCancel={handleCancel} />}
      </div>
      <div className="col-12 col-xl-4">
        {isFetching && <ProductCard.Skeleton />}
        {!isFetching && !!product && (
          <div className="m-auto mw-md-450 mw-xl-unset">
            <ProductCard product={product} preview />
          </div>
        )}
      </div>
    </div>
  );
};

export default InstantCheckoutPage;
