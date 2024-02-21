import React from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from '@hooks/useTranslation';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

import { getImage } from '@utils/helpers';
import { constructCrumbItems } from '@utils/knowledgeCenter';
import { useGetTopic } from '@store/api/knowledgeCenterApi';
import { QueryParams } from '@models/QueryParams';
import { useAuthStatus } from '@hooks/useAuthStatus';
import { useQueryParams } from '@hooks/useQueryParams';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import Article from '@components/knowledge-center/Article';
import Breadcrumb from '@components/ui/breadcrumb/Breadcrumb';
import RelatedContent from '@components/related-content/RelatedContent';
import CategoryHeader from '@components/knowledge-center/CategoryHeader';
import TopicNavigation from '@components/knowledge-center/TopicNavigation';
import Can from '@components/can/Can';

import {
  topicsGrid,
  navigationWrapper,
  relatedContentWrapper,
  descriptionWrapper
} from '../knowledge-center.scss';
import Skeleton from 'react-loading-skeleton';

const TopicPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const { getParam } = useQueryParams();
  const translate = useTranslatedAttribute();
  const { t } = useTranslation();

  const { isAuthenticated } = useAuthStatus();

  const { data: topic, isFetching } = useGetTopic(topicId as string);

  // Either derive from query params if set previously or use the first article in the array
  const currentArticleId =
    getParam('KNOWLEDGE_CENTER_ARTICLE_ID') ?? String(topic?.articles[0]?.id);

  const handleClick = (articleId: number) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [QueryParams.KNOWLEDGE_CENTER_ARTICLE_ID]: String(articleId)
      }).toString()
    });
  };

  return (
    <>
      {isFetching && <TopicPageSkeleton />}
      {!isFetching && topic && (
        <>
          <div className="mb-24">
            {topic && topic.ancestors && <Breadcrumb crumbItems={constructCrumbItems(topic, t)} />}
            <CategoryHeader
              title={translate(topic.title)}
              description={translate(topic.description)}
              {...(topic.image && { image: getImage(topic.image) })}
            />
          </div>

          {!isEmpty(topic.articles) && (
            <div className={classNames('mb-28', topicsGrid)}>
              <div className={classNames(navigationWrapper)}>
                <Can permissions={isAuthenticated ? ['view_any_article'] : []}>
                  <TopicNavigation
                    articles={topic?.articles}
                    currentArticleId={currentArticleId}
                    handleClick={handleClick}
                  />
                </Can>
              </div>
              <div
                className={classNames('d-flex flex-column gap-24', relatedContentWrapper, {
                  'mt-0 mt-lg-24': !isEmpty(topic.discussions) || !isEmpty(topic.profiles)
                })}>
                {!isEmpty(topic.discussions) && (
                  <RelatedContent
                    content={topic.discussions}
                    content_type="discussions"
                    title={t('related_content.discussion', 'Groups')}
                  />
                )}
                {!isEmpty(topic.profiles) && (
                  <RelatedContent
                    content={topic.profiles}
                    content_type="profile"
                    title={t('related_content.profiles', 'Profiles')}
                  />
                )}
              </div>
              <div className={classNames(descriptionWrapper)}>
                <Can permissions={isAuthenticated ? ['view_any_article'] : []}>
                  <Article currentArticleId={currentArticleId} />
                </Can>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TopicPage;

const TopicPageSkeleton = () => (
  <>
    <div className="row">
      <Skeleton baseColor="white" height={280} borderRadius={12} className="mb-20" />
    </div>
    <div className="row mb-36">
      <div className="col-12 col-xl-4">
        <Skeleton baseColor="white" height={150} borderRadius={12} className="mb-20" />
      </div>
      <div className="col-12 col-xl-8">
        <Skeleton baseColor="white" height={400} borderRadius={12} />
      </div>
    </div>
  </>
);
