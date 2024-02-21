import React from 'react';
import map from 'lodash/map';
import { useNavigate } from 'react-router-dom';

import type { HomeArticle, HomeArticleSection } from '@types';

import { Breakpoints } from '@models/Breakpoints';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

interface ArticlesLinkProps {
  data: HomeArticleSection;
}

const HomeArticles = (props: ArticlesLinkProps) => {
  const { title, articles, colors } = props.data;

  const { width } = useWindowDimensions();
  const isMobile = width <= Breakpoints.LG;
  const translate = useTranslatedAttribute();
  const navigate = useNavigate();

  return (
    <section className="py-48 bg-white">
      <div className="container">
        <p className="fs-24 fs-md-32 fs-lg-40 mb-28 mb-lg-48 fw-bold text-center">
          {translate(title)}
        </p>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-20 justify-content-center">
          {map(articles, (item: HomeArticle) => {
            return (
              <div
                key={`article-${item.id}`}
                className="col p-lg-20 cursor-pointer"
                data-testid={`article-link-${item.id}`}
                onClick={() => navigate(item.slug)}>
                <div
                  className={`p-24 rounded ${isMobile ? `bg-${colors.background}` : ''}`}
                  data-testid={`article-wrapper-${item.id}`}>
                  <div
                    className={`d-flex align-items-center justify-content-center m-auto width-9 height-9 rounded-circle bg-${colors.iconBackground}`}
                    data-testid="article-icon-container">
                    <i className={`fs-40 ${item.icon} text-${colors.icon}`}></i>
                  </div>
                  <p
                    className={`mb-0 mt-20 fs-20 fs-lg-24 fw-bold text-center text-${colors.title}`}>
                    {translate(item.title)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default HomeArticles;
