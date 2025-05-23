export const URLS = {
  HOME_PAGE_VEDIO: "shared/global_variables/?key=HOME_PAGE_VIDEO",
  REGISTER: "auth/register/",
  LOGIN: "/auth/login/",
  FORGOT_PASSWORD: "/auth/forgot_password/",
  RESET_PASSWORD: "/auth/reset_password/",
  TRAINERS: "auth/users/?account_type=TRAINER&is_verified=True",
  PROGRAMS: "/program",
  TRAINER_BIOGRAPHY_BIDEO: "/auth/users/?account_type=TRAINER&is_verified=True",
  MONTHS: "/program/month",
  GALLERY: "/program/program-data/",
  GET_PAYEMNT: "/payments/subscriptions/?status=incomplete",
  DELETE_INCOMPLETE_PAYMENT: "/payments/subscriptions/delete/",
  GET_SUBSCRIPTION: "/payments/subscriptions/subscription/",
  GET_Search: "/program/summary/",
  GET_GALLERY: "/program/summary/?ordering=user_id",
  POST_WATCHING: "/program/main-video/watched-seconds/",
  UPDATE_WATCHING: "/program/main-video/watched-seconds/",
  UPDATE_WATCHING_TIP: "/program/tip-video/watched-seconds/",
  GET_WATCHING: "/program/main-video/watched-seconds/",
  GET_WATCHING_TIP: "/program/tip-video/watched-seconds/",
  ACCOUNT_TYPE: "/auth/profile/",
  BONUS_CATEGORY: "/program/category/?name=bonus",
  BONUS_ID: "/program/",
  ME: "/auth/me/",
  UPDATE_PROFILE: "/auth/update/",
};

export const METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const

export type METHODTYPES = keyof typeof METHODS;

