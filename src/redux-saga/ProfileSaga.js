import {put, call, takeLatest, take} from 'redux-saga/effects';
import EncryptedStorage from 'react-native-encrypted-storage';
import constants from '../constants/index';
import {AUTH, TOKEN, PROFILE} from '../redux/store/TypeConstants';
import {
  POST_SET,
  GET,
  GET_SET,
  POST,
  getToken,
  json_data,
  PUT_SET,
  POST_FORM,
  PATCH_SET,
  DELETE_SET,
  DELETE,
} from './setup/method';

function* getProfile() {
  try {
    let response = yield call(GET, `auth/me`, yield getToken());

    console.log(response, 'RESPPPT');

    yield put({
      type: PROFILE.GET_PROFILE_SUCCESS.type,
      data: {
        [PROFILE.GET_PROFILE_SUCCESS.value]: response.user,
      },
    });
  } catch (error) {
    console.log(error?.response?.status);
    if (error?.response?.status == 401) {
      try {
        console.log('token at saga', yield getToken());
        yield call(EncryptedStorage.removeItem, constants.TOKEN);
        yield put({
          type: 'RESET',
        });
        yield put({
          type: AUTH.LOGOUT_SUCCESS.type,
        });
      } catch (err) {
        yield put({
          type: AUTH.LOGOUT_FAILURE.type,
        });
      }
    }
    yield put({
      type: PROFILE.GET_PROFILE_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getHomeData() {
  try {
    let response = yield call(GET, `home`, yield getToken());

    yield put({
      type: PROFILE.GET_HOME_SUCCESS.type,
      data: {
        [PROFILE.GET_HOME_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: PROFILE.GET_HOME_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getUpdateProfile(action) {
  try {
    yield call(
      PATCH_SET,
      PROFILE.UPDATE_PROFILE_SUCCESS,
      PROFILE.UPDATE_PROFILE_FAILURE,
      `auth/update-profile`,
      action.payload,
    );
  } catch (error) {
    yield put({
      type: PROFILE.UPDATE_PROFILE_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getDeleteAccount(action) {
  try {
    let response = yield call(DELETE, `auth/delete-account`, yield getToken());

    yield put({
      type: PROFILE.DELETE_ACCOUNT_SUCCESS.type,
      data: {
        [PROFILE.DELETE_ACCOUNT_SUCCESS.value]: response,
      },
    });

    // if(response)
    yield call(EncryptedStorage.removeItem, constants.TOKEN);
    yield put({
      type: 'RESET',
    });
    yield put({
      type: AUTH.LOGOUT_SUCCESS.type,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: PROFILE.DELETE_ACCOUNT_FAILURE.type,
      data: {error: error},
    });
    yield put({
      type: AUTH.LOGOUT_FAILURE.type,
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(PROFILE.GET_PROFILE_REQUEST.type, getProfile);
    })(),

    (function* () {
      yield takeLatest(PROFILE.UPDATE_PROFILE_REQUEST.type, getUpdateProfile);
    })(),

    (function* () {
      yield takeLatest(PROFILE.GET_HOME_REQUEST.type, getHomeData);
    })(),
    (function* () {
      yield takeLatest(PROFILE.DELETE_ACCOUNT_REQUEST.type, getDeleteAccount);
    })(),
  ],
};
