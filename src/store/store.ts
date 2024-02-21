import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import tempAuthSlice from './tempAuthSlice';
import navigationSlice from './navigationSlice';
import currentUserSlice from './currentUserSlice';
import { userApi, userApiMiddleware } from './api/userApi';
import { authApi, loginApiMiddleware } from './api/authApi';
import { configApi, configApiMiddleware } from './api/configApi';
import { meetingApi, meetingApiMiddleware } from './api/meetingApi';
import { profileApi, profileApiMiddleware } from './api/profileApi';
import { discussionApi, discussionApiMiddleware } from './api/discussionApi';
import { fileUploadApi, fileUploadApiMiddleware } from './api/fileUploadApi';
import { cloudUploadApi, cloudUploadApiMiddleware } from './api/cloudUploadApi';
import { linkPreviewApi, linkPreviewApiMiddleware } from './api/linkPreviewApi';
import { notificationApi, notificationApiMiddleware } from './api/notificationApi';
import { knowledgeCenterApi, knowledgeCenterApiMiddleware } from './api/knowledgeCenterApi';
import { joinMeetingApi, joinMeetingApiMiddleware } from './api/joinMeetingApi';
import { productsApi, productsApiMiddleware } from './api/productsApi';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    userApi?.reducerPath,
    configApi?.reducerPath,
    authApi?.reducerPath,
    profileApi?.reducerPath,
    meetingApi?.reducerPath,
    discussionApi?.reducerPath,
    notificationApi?.reducerPath,
    linkPreviewApi?.reducerPath,
    knowledgeCenterApi?.reducerPath,
    cloudUploadApi?.reducerPath,
    joinMeetingApi?.reducerPath,
    productsApi?.reducerPath,
    tempAuthSlice.name,
    navigationSlice.name
  ]
};

const rootReducer = combineReducers({
  [configApi.reducerPath]: configApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [meetingApi.reducerPath]: meetingApi.reducer,
  [discussionApi.reducerPath]: discussionApi.reducer,
  [fileUploadApi.reducerPath]: fileUploadApi.reducer,
  [cloudUploadApi.reducerPath]: cloudUploadApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [linkPreviewApi.reducerPath]: linkPreviewApi.reducer,
  [knowledgeCenterApi.reducerPath]: knowledgeCenterApi.reducer,
  [joinMeetingApi.reducerPath]: joinMeetingApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  authSlice: authSlice?.reducer,
  currentUserSlice: currentUserSlice?.reducer,
  tempAuthSlice: tempAuthSlice?.reducer,
  navigationSlice: navigationSlice?.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = (getDefaultMiddleware: any) => {
  const defaultMiddleware = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  });
  return defaultMiddleware
    .concat(configApiMiddleware)
    .concat(loginApiMiddleware)
    .concat(userApiMiddleware)
    .concat(profileApiMiddleware)
    .concat(meetingApiMiddleware)
    .concat(discussionApiMiddleware)
    .concat(fileUploadApiMiddleware)
    .concat(notificationApiMiddleware)
    .concat(linkPreviewApiMiddleware)
    .concat(fileUploadApiMiddleware)
    .concat(cloudUploadApiMiddleware)
    .concat(knowledgeCenterApiMiddleware)
    .concat(joinMeetingApiMiddleware)
    .concat(productsApiMiddleware);
};

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
