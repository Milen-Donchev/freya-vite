import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';

import { resetUserApi } from '@store/api/userApi';
import { resetMeetingApi } from '@store/api/meetingApi';
import { resetProfileApi } from '@store/api/profileApi';
import { resetProductsApi } from '@store/api/productsApi';
import { resetDiscussionApi } from '@store/api/discussionApi';
import { resetJoinMeetingApi } from '@store/api/joinMeetingApi';
import { resetNotificationApi } from '@store/api/notificationApi';
import { resetKnowledgeCenterApi } from '@store/api/knowledgeCenterApi';

import { resetAuthSlice } from '@store/authSlice';
import { resetCurrentUserSlice } from '@store/currentUserSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    /* RESET QUERY CACHE */
    dispatch(resetDiscussionApi());
    dispatch(resetJoinMeetingApi());
    dispatch(resetKnowledgeCenterApi());
    dispatch(resetMeetingApi());
    dispatch(resetNotificationApi());
    dispatch(resetUserApi());
    dispatch(resetProfileApi());
    dispatch(resetProductsApi());

    /* RESET SLICE STATES */
    dispatch(resetAuthSlice());
    dispatch(resetCurrentUserSlice());

    /* NAVIGATE AWAY BACK TO LOGIN */
    navigate(Routes.LOGIN, { replace: true });
  };

  return {
    logout
  };
};
