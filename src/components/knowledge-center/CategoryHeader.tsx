import React from 'react';
import { useTranslation } from '@hooks/useTranslation';

import CardFrame from '../ui/frames/CardFrame';

import defaultImage from './assets/knowledge-center-header.svg';

interface CategoryHeaderProps {
  title?: string;
  image?: string;
  description?: string;
}

const CategoryCard = (props: CategoryHeaderProps) => {
  const { title, image, description } = props;

  const { t } = useTranslation();

  return (
    <CardFrame className="flex-row row g-0">
      <div className="col-12 col-md-6 col-lg-4 flex-shrink-0">
        <img
          src={image ?? defaultImage}
          className="object-fit-cover rounded-3 width-100 height-100"
        />
      </div>
      <div className="col-12 col-md-6 col-lg-8 align-self-center">
        <div className="p-20 p-lg-40">
          <p className="fs-24 fs-lg-32 fw-semibold mb-8">
            {title ?? t('knowledge-center.header_title', 'Knowledge center')}
          </p>
          <p className="fs-18 mb-0">
            {description ??
              t('knowledge-center.header_description', 'Knowledge center description')}
          </p>
        </div>
      </div>
    </CardFrame>
  );
};

export default CategoryCard;
