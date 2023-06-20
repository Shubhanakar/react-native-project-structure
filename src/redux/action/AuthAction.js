import {AUTH} from '../store/TypeConstants';

export const getSignIn = payload => ({
  type: AUTH.LOGIN_REQUEST.type,
  payload,
});

export const getSignUp = payload => ({
  type: AUTH.SIGNUP_REQUEST.type,
  payload,
});

export const getLogout = payload => ({
  type: AUTH.LOGOUT_REQUEST.type,
  payload,
});

export const socialData = payload => ({
  type: AUTH.SOCIAL_DATA_REQUEST.type,
  payload,
});
