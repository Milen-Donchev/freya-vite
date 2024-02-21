import { Route } from "react-router-dom";

import { Routes } from "@models/Routes";

import StyleguidePage from "@pages/styleguide/StyleguidePage";
import PageNotFound from "@pages/page-not-found/PageNotFound";
import TermsAndConditions from "@pages/auth/register/TermsAndConditions";

import NavbarLayout from "@components/layouts/navbar-layout/NavbarLayout";

interface AlwaysAvailableRouterProps {
  isAuthenticated: boolean;
  isGuestLoginAllowed: boolean;
}

const AlwaysAvailableRouter = ({
  isAuthenticated,
  isGuestLoginAllowed,
}: AlwaysAvailableRouterProps) => {
  const hasAccess = isAuthenticated || isGuestLoginAllowed;

  return (
    <Route element={<NavbarLayout isGuestLoginAllowed={isGuestLoginAllowed} />}>
      <Route path={Routes.STYLEGUIDE} element={<StyleguidePage />} />
      {!hasAccess && (
        <Route path={Routes.TERMS} element={<TermsAndConditions />} />
      )}
      {!hasAccess && <Route path="*" element={<PageNotFound />} />}
    </Route>
  );
};

export default AlwaysAvailableRouter;
