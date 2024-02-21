import React from 'react';
import TagManager from 'react-gtm-module';
import { Helmet } from 'react-helmet-async';
import isUndefined from 'lodash/isUndefined';
import { ToastContainer } from 'react-toastify';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { store } from '@store/store';
import { configGet } from '@freya/config';

import MainRouter from '@freya/router/MainRouter';

import CookiePopup from '@components/ui/cookie-popup/CookiePopup';

setupListeners(store.dispatch);

const App = () => {
  if (!isUndefined(configGet('gtmId'))) {
    const tagManagerArgs = {
      gtmId: configGet('gtmId')
    };

    TagManager.initialize(tagManagerArgs);
  }

  return (
    <>
      <Helmet>
        <title>{configGet('pageTitle')}</title>
        <link rel="icon" type="image/png" href={configGet('favicon')} />
      </Helmet>
      <MainRouter />
      <CookiePopup />
      <ToastContainer hideProgressBar={true} limit={3} position="bottom-right" autoClose={5000} />
    </>
  );
};

export default App;
