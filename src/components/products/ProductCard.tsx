import React from 'react';
import parseHtml from 'react-html-parser';
import Skeleton from 'react-loading-skeleton';

import type { Product } from '@freya/types/products';

import { getImage } from '@utils/helpers';
import { useTranslation } from '@hooks/useTranslation';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import CardFrame from '@components/ui/frames/CardFrame';
import LoadingButton from '@components/ui/buttons/LoadingButton';

import productPlaceholder from '@freya/assets/images/product-placeholder.svg';

interface ProductCardProps {
  product: Product;
  preview?: boolean;
  onPurchaseClick?: () => void;
  disabled?: boolean;
}

const ProductCard = ({ product, preview, onPurchaseClick, disabled }: ProductCardProps) => {
  const { image, title, description, price_formatted } = product;

  const { t } = useTranslation();
  const translate = useTranslatedAttribute();

  return (
    <CardFrame className="height-100">
      <div className="px-20 px-lg-40 pt-20 pt-lg-40 text-center">
        <img
          src={!!getImage(image, 'small') ? getImage(image, 'small') : productPlaceholder}
          alt="product"
          className="object-fit-contain height-12 width-12 rounded-3"
        />
      </div>

      <div className="d-flex height-100 flex-column justify-content-between p-20 p-lg-40">
        <div>
          <h3 className="fs-24 fw-bold text-center">{translate(title)}</h3>
          <p className="">{parseHtml(translate(description))}</p>
        </div>

        <div className="text-center">
          <p className="fs-24 fw-bold text-center mb-0">{price_formatted}</p>
          {!preview && (
            <LoadingButton
              disabled={disabled}
              className="btn btn-primary-500 btn-lg mt-20"
              onClick={onPurchaseClick}>
              {t('common.purchase', 'Purchase')}
            </LoadingButton>
          )}
        </div>
      </div>
    </CardFrame>
  );
};

ProductCard.Skeleton = function ({ count }: { count?: number }) {
  return (
    <>
      {Array(count)
        .fill('')
        .map((_, index) => (
          <Skeleton key={String(index)} height={420} borderRadius={25} baseColor="white" />
        ))}
    </>
  );
};

export default ProductCard;
