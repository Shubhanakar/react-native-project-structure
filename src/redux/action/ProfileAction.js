import {PROFILE} from '../store/TypeConstants';

export const getProfile = () => ({
  type: PROFILE.GET_PROFILE_REQUEST.type,
});

export const getHomeData = () => ({
  type: PROFILE.GET_HOME_REQUEST.type,
});

export const updateProfile = payload => ({
  type: PROFILE.UPDATE_PROFILE_REQUEST.type,
  payload,
});
export const deleteAccountReq = payload => ({
  type: PROFILE.DELETE_ACCOUNT_REQUEST.type,
  payload,
});
