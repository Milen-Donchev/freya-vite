import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { useTranslation } from '@hooks/useTranslation';

import CardFrame from '@components/ui/frames/CardFrame';
import FormFrame from '@components/ui/form-utils/FormFrame';
import FormField from '@components/ui/form-utils/FormField';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';
import FormCheckboxField from '@components/ui/form-utils/FormCheckboxField';

interface InstantCheckoutFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const InstantCheckoutForm = ({ onSubmit, onCancel }: InstantCheckoutFormProps) => {
  const { t } = useTranslation();

  return (
    <CardFrame className="p-20 p-lg-40">
      <div className="row">
        <p className="fs-24 fw-semibold mb-28">{t('instant_checkout.title', 'Checkout details')}</p>
      </div>
      <div>
        <div className="row">
          <p className="fs-18 fw-semibold">
            {t('instant_checkout.billing_address', 'Billing address')}
          </p>
        </div>
        <FormFrame formType="instant_checkout" onSubmit={onSubmit}>
          <div className="row row-cols-1 row-cols-lg-2 g-20 mb-28">
            <div className="col">
              <FormField
                name="first_name"
                placeholder={t('common.first_name', 'First name')}
                label={t('common.first_name', 'First name')}
              />
            </div>
            <div className="col">
              <FormField
                name="last_name"
                placeholder={t('common.last_name', 'Last name')}
                label={t('common.last_name', 'Last name')}
              />
            </div>
            <div className="col">
              <FormField
                name="address"
                placeholder={t('common.address', 'Address')}
                label={t('common.address', 'Address')}
              />
            </div>
            <div className="col">
              <FormField
                name="ucn"
                placeholder={t('common.ucn', 'UCN')}
                label={t('common.ucn', 'UCN')}
              />
            </div>
          </div>
          <div className="row">
            <p className="fs-18 fw-semibold">
              {t('instant_checkout.payment_methods', 'Payment methods')}
            </p>
          </div>
          {/* TODO:: (Future) - Replace with Radio Group by mapping data?.payment_methods */}
          <FormCheckboxField
            id="card_payment"
            name="card_payment"
            type="radio"
            defaultChecked={true}
            label={
              <>
                <p className="mb-12">
                  {t('instant_checkout.card_payment', 'Credit card / Debit card')}
                </p>
                <p className="fs-14 mb-0">
                  {t('instant_checkout.card_payment_details', 'Details')}
                </p>
              </>
            }
          />
          <hr className="text-primary my-32" />
          <FormCheckboxField
            id="gdpr_agreement"
            name="gdpr_agreement"
            label={
              <>
                <span>{t('instant_checkout.gdpr_agreements', 'GDPR agreement')}&nbsp;</span>
                <Link to="/terms#section-2" target="_blank" className="text-primary">
                  {t('instant_checkout.gdpr', 'GDPR')}
                </Link>
              </>
            }
          />
          <FormCheckboxField
            id="terms_agreement"
            name="terms_agreement"
            label={
              <>
                <span>{t('instant_checkout.terms_agreements', 'Terms agreement')}&nbsp;</span>
                <Link to="/terms#section-1" target="_blank" className="text-primary">
                  {t('instant_checkout.terms', 'Terms')}
                </Link>
              </>
            }
            className="mt-20"
          />
          <div className="d-flex flex-wrap justify-content-between gap-20 mt-32">
            <button
              onClick={onCancel}
              className="btn btn-lg btn-outline-primary width-100 width-md-auto">
              {t('common.cancel', 'Cancel')}
            </button>
            <FormSubmitButton
              className="btn btn-lg btn-primary width-100 width-md-auto"
              title={t('instant_checkout.submit', 'Submit')}
            />
          </div>
        </FormFrame>
      </div>
    </CardFrame>
  );
};

InstantCheckoutForm.Skeleton = function () {
  return <Skeleton baseColor="white" borderRadius={25} height={420} />;
};

export default InstantCheckoutForm;
