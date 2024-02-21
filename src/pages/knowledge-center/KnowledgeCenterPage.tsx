import get from 'lodash/get';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { useTranslation } from '@hooks/useTranslation';
import type { KnowledgeCenterItem } from '@types';

import { getImage } from '@utils/helpers';
import { constructCrumbItems } from '@utils/knowledgeCenter';
import { useGetCategories } from '@store/api/knowledgeCenterApi';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import Breadcrumb from '@components/ui/breadcrumb/Breadcrumb';
import CategoryCard from '@components/knowledge-center/CategoryCard';
import CategoryHeader from '@components/knowledge-center/CategoryHeader';
import NoResults from '@components/layouts/no-results/NoResults';

const KnowledgeCenterPage = () => {
  const { categoryId = undefined } = useParams();

  const { t } = useTranslation();
  const translate = useTranslatedAttribute();

  const { data, isFetching } = useGetCategories(categoryId);

  // Returns either Category object when on subcategory or null if on the main listing page.
  const currentCategory = useMemo(
    () => (!isArray(data?.data) ? (get(data, 'data', {}) as KnowledgeCenterItem) : null),
    [data]
  );

  // Concat list of categories and topics either from subcategory's children and topics or from initial request's data
  const categoriesAndTopics = useMemo(
    () =>
      currentCategory
        ? concat(get(currentCategory, 'children', []), get(currentCategory, 'topics', []))
        : get(data, 'data', []),
    [currentCategory, data]
  );

  return (
    <>
      {isFetching && <KnowledgeCenterSkeleton />}
      {!isFetching && (
        <div className="mb-32">
          {currentCategory && currentCategory.ancestors && (
            <Breadcrumb crumbItems={constructCrumbItems(currentCategory, t)} />
          )}
          <CategoryHeader
            {...(currentCategory?.description && {
              description: translate(currentCategory.description)
            })}
            {...(currentCategory?.title && { title: translate(currentCategory.title) })}
            {...(currentCategory?.image && { image: getImage(currentCategory.image) })}
          />
        </div>
      )}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-24 mb-28">
        {!isFetching &&
          map(
            categoriesAndTopics,
            ({ id, entity_type, title, image, slug }: KnowledgeCenterItem) => (
              <div className="col" key={String(id)}>
                <CategoryCard
                  title={translate(title)}
                  image={getImage(image)}
                  href={`/${
                    entity_type === 'category' ? 'knowledge-center' : 'topics'
                  }/${id}/${slug}`}
                />
              </div>
            )
          )}
      </div>
      {!isFetching && isEmpty(categoriesAndTopics) && (
        <NoResults
          message={t('common.no_results', 'There is no result.')}
          className="card rounded-3 shadow-sm border-0 mb-36"
        />
      )}
    </>
  );
};

export default KnowledgeCenterPage;

const KnowledgeCenterSkeleton = () => (
  <>
    <div className="row">
      <Skeleton baseColor="white" height={280} borderRadius={12} className="mb-32" />
    </div>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-24 mb-28">
      <div className="col">
        <Skeleton baseColor="white" height={250} borderRadius={12} className="mb-20" />
      </div>
      <div className="col">
        <Skeleton baseColor="white" height={250} borderRadius={12} className="mb-20" />
      </div>
      <div className="col">
        <Skeleton baseColor="white" height={250} borderRadius={12} className="mb-20" />
      </div>
      <div className="col">
        <Skeleton baseColor="white" height={250} borderRadius={12} className="mb-20" />
      </div>
    </div>
  </>
);
