import * as Yup from 'yup';

export const commonCookiePopupSchema = {
  facebook_pixel: Yup.boolean(),
  linkedin: Yup.boolean(),
  hotjar: Yup.boolean(),
  google_analytics: Yup.boolean(),
  google_ad_manager: Yup.boolean(),
  google_ads_remarketing: Yup.boolean(),
  youtube: Yup.boolean()
};

export const cookiePopupSchema = Yup.object().shape({
  ...commonCookiePopupSchema
});

export const cookiePopupValues = {
  facebook_pixel: false,
  linkedin: false,
  hotjar: false,
  google_analytics: false,
  google_ad_manager: false,
  google_ads_remarketing: false,
  youtube: false
};
