import React from 'react';
import { Route } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useAuthStatus } from '@hooks/useAuthStatus';

import KnowledgeCenterPage from '@pages/knowledge-center/KnowledgeCenterPage';
import DiscussionsListingPage from '@pages/discussions/DiscussionsListingPage';
import TermsAndConditions from '@pages/auth/register/TermsAndConditions';
import PageNotFound from '@pages/page-not-found/PageNotFound';
import ContactPage from '@pages/contacts/ContactPage';
import NotificationListingPage from '@pages/notifications/NotificationListingPage';
import ScheduleProfilesListing from '@pages/schedules/ScheduleProfilesListing';
import ProfileSchedule from '@pages/schedules/ProfileSchedule';
import SchedulePatientDetails from '@pages/schedules/SchedulePatientDetails';
import MeetingsListingPage from '@pages/meetings/MeetingsListingPage';
import MeetingDetailsPage from '@pages/meetings/MeetingDetailsPage';
import DiscussionPage from '@pages/discussions/discussion/DiscussionPage';
import ProfilesListingPage from '@pages/profile/ProfilesListingPage';
import ProductsPage from '@pages/products/ProductsPage';
import PaymentStatusPage from '@pages/products/PaymentStatusPage';
import InstantCheckoutPage from '@pages/products/InstantCheckoutPage';
import TopicPage from '@pages/knowledge-center/topic/TopicPage';
import DashboardPage from '@pages/dashboard/DashboardPage';
import ProfilePage from '@pages/profile/ProfilePage';
import EditProfile from '@pages/profile/EditProfile';
import LogoutPage from '@pages/auth/LogoutPage';
import SettingsPage from '@pages/settings/SettingsPage';

import SidebarLayout from '@components/layouts/SidebarLayout';
import ProtectedRoute from '@components/navigations/header-navigation/ProtectedRoute';

const AuthRouter = () => {
  const {
    isAuthenticated,
    isGuestLoginAllowed,
    canVisitDiscussions,
    canVisitKnowledgeCenter,
    canVisitProfiles,
    canVisitProducts,
    canVisitProfileListingSchedules
  } = useAuthStatus();

  const hasAccess = isAuthenticated || isGuestLoginAllowed;

  return (
    <Route element={<ProtectedRoute condition={hasAccess} shouldSaveRedirectRoute />}>
      <Route element={<SidebarLayout />}>
        {hasAccess && <Route path={Routes.CONTACTS} element={<ContactPage />} />}
        <Route path={Routes.DASHBOARD} element={<DashboardPage />} />
        {canVisitDiscussions && (
          <>
            <Route path={Routes.DISCUSSIONS_LISTING} element={<DiscussionsListingPage />} />
            <Route path={Routes.DISCUSSION} element={<DiscussionPage />} />
          </>
        )}
        {canVisitKnowledgeCenter && (
          <>
            <Route path={Routes.KNOWLEDGE_CENTER_CATEGORIES} element={<KnowledgeCenterPage />} />
            <Route path={Routes.KNOWLEDGE_CENTER_TOPICS} element={<TopicPage />} />
          </>
        )}
        <Route path={Routes.MEETINGS} element={<MeetingsListingPage />} />
        <Route path={Routes.MEETING_DETAILS} element={<MeetingDetailsPage />} />
        {canVisitProfiles && (
          <>
            <Route path={Routes.PROFILE} element={<ProfilePage />} />
            <Route path={Routes.PROFILES_LISTING} element={<ProfilesListingPage />} />
          </>
        )}
        {canVisitProducts && <Route path={Routes.PRODUCTS} element={<ProductsPage />} />}
        {isAuthenticated && (
          <>
            <Route path={Routes.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={Routes.NOTIFICATIONS} element={<NotificationListingPage />} />
            <Route path={Routes.INSTANT_CHECKOUT} element={<InstantCheckoutPage />} />
            <Route path={Routes.PAYMENT_STATUS} element={<PaymentStatusPage />} />
          </>
        )}
        {canVisitProfileListingSchedules && (
          <Route path={Routes.PROFILE_LISTING_SCHEDULES} element={<ScheduleProfilesListing />} />
        )}
        <Route path={Routes.LOGOUT} element={<LogoutPage />} />
        <Route path={Routes.PROFILE_SCHEDULE} element={<ProfileSchedule />} />
        <Route path={Routes.MEETING_SAVE} element={<SchedulePatientDetails />} />
        {isAuthenticated && <Route path={Routes.SETTINGS + '/*'} element={<SettingsPage />} />}
        {hasAccess && <Route path={Routes.TERMS} element={<TermsAndConditions />} />}
        {hasAccess && <Route path="*" element={<PageNotFound />} />}
      </Route>
    </Route>
  );
};

export default AuthRouter;
