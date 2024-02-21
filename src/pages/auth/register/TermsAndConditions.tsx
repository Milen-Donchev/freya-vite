import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Routes } from '@models/Routes';
import { useTranslation } from '@hooks/useTranslation';

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);

  useEffect(() => {
    const anchor = window.location.hash;
    const anchorId = anchor.slice(1);
    const anchorElement = document.getElementById(anchorId);

    if (anchorElement) {
      anchorElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <div className={`${currentUser ? 'mb-32' : 'py-48'} container`}>
      {!currentUser && (
        <Link to={Routes.REGISTER} className="btn btn-lg btn-outline-primary mb-36">
          <i className="fa-regular fa-circle-arrow-left me-8"></i>
          {t('common.back', 'Back')}
        </Link>
      )}
      <div id="section-1" className="scroll-margin-top">
        {ReactHtmlParser(t('register.terms_and_conditions_section_1', 'Section 1'))}
      </div>
      <div id="section-2" className="scroll-margin-top">
        {ReactHtmlParser(t('register.terms_and_conditions_section_2', 'Section 2'))}
      </div>
      <div id="section-3" className="scroll-margin-top">
        {' '}
        {ReactHtmlParser(t('register.terms_and_conditions_section_3', 'Section 3'))}
      </div>
    </div>
  );
};

export default memo(TermsAndConditions);
