import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";

import { persistor, store } from "@store/store";

import { Config } from "@providers/Config";
import { Translations } from "@providers/Translations";
import { SocketProvider } from "@providers/SocketProvider";
import { DictionaryProvider } from "@providers/DictionaryProvider";

import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("app-root")!;
const root = createRoot(container);

root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Config>
        <HelmetProvider>
          <Translations>
            <SocketProvider>
              <DictionaryProvider>
                <App />
              </DictionaryProvider>
            </SocketProvider>
          </Translations>
        </HelmetProvider>
      </Config>
    </PersistGate>
  </ReduxProvider>
);
