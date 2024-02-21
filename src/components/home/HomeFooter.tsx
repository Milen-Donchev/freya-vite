import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@hooks/useTranslation';
import map from 'lodash/map';

import type { HomeFooterSection, HomeLink, HomeSocialMedia } from '@types';

import { configGet } from '@freya/config';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

interface FooterProps {
  data: HomeFooterSection;
}

const HomeFooter = (props: FooterProps) => {
  const { data } = props;
  const { links, socialMedia, colors } = data;
  const { background, title, socialMediaBackground, icon } = colors;

  const { t } = useTranslation();
  const translate = useTranslatedAttribute();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const logo = configGet('logo');

  return (
    <footer>
      <section className={`bg-${background} py-24`}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-32 align-items-md-center">
            <div>
              <img src={logo} height="40" alt="sineo_logo" loading="lazy" />
            </div>
            <div className="d-flex flex-column flex-md-row flex-wrap gap-16 gap-md-36 justify-content-end">
              {map(links, (item: HomeLink, index: number) => (
                <div
                  key={`footer_link_${index}`}
                  data-testid={`footer-link-${index}`}
                  className={`d-inline-block fw-semibold cursor-pointer fs-18 text-${title}`}
                  onClick={() => navigate(`/${item.slug}`)}>
                  {translate(item.title)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={`bg-${socialMediaBackground} text-white py-12`}>
        <div className="container">
          <div className="d-flex gap-12 justify-content-between align-items-center">
            <p className={`fs-14 fw-bold mb-0 text-${icon}`}>{`© ${currentYear} ${t(
              'common.rights_reserved',
              'All rights reserved'
            )}`}</p>
            <div className="d-flex align-items-center gap-16">
              {map(socialMedia, (item: HomeSocialMedia, index: number) => (
                <a href={item.link} target="_blank" key={`footer_social_media_link_${index}`}>
                  <i className={`fab ${item.icon} fs-28 text-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
export default HomeFooter;
