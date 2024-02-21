import React from 'react';
import { Spinner } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import map from 'lodash/map';

import { useGetArticle } from '@store/api/knowledgeCenterApi';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { useTranslation } from '@hooks/useTranslation';

import CardFrame from '@components/ui/frames/CardFrame';
import ResourceBox from '@components/upload/ResourceBox';
import Video from '@components/video/Video';

interface ArticleProps {
  currentArticleId: string;
}

const Article = (props: ArticleProps) => {
  const { currentArticleId } = props;

  const { t } = useTranslation();
  const translate = useTranslatedAttribute();

  const { data: article, isFetching } = useGetArticle(currentArticleId);

  return (
    <CardFrame className="p-20 p-lg-40 height-100">
      {isFetching && (
        <div className="text-center p-48">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!isFetching && article && (
        <div className="editor-content">{ReactHtmlParser(translate(article?.description))}</div>
      )}

      {!isFetching && article?.attachments && article.attachments.length !== 0 && (
        <>
          {/* Videos */}
          <div className="d-flex flex-column gap-20">
            {map(
              article.attachments,
              ({ id, path, resource_type }) =>
                resource_type === 'video' && (
                  <Video key={id} videoSource={path} data-testid={`video-${id}`} />
                )
            )}
          </div>
          <h3 className="mb-20 mt-24 fs-18">{t('article.resources_title', 'Resources')}</h3>
          <div className="container g-0">
            <div className="row row-cols-xl-2 row-cols-1 g-12">
              {map(article.attachments, ({ id, name, size, path, resource_type }) => (
                <div key={String(id)} className="col">
                  <ResourceBox
                    key={String(id)}
                    resource_type={resource_type}
                    filename={name}
                    path={path}
                    size={size}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </CardFrame>
  );
};

export default Article;
