import {put, call, takeLatest} from 'redux-saga/effects';
import EncryptedStorage from 'react-native-encrypted-storage';
import constants from '../constants/index';
import {AUTH, TOKEN} from '../redux/store/TypeConstants';
import {POST, getToken} from './setup/method';

function* getSignin(action) {
  try {
    // let response = yield call(POST, 'auth/login-sso', action.payload, '');
    yield put({
      type: AUTH.LOGIN_SUCCESS.type,
      data: {
        [AUTH.LOGIN_SUCCESS.value]: 'Sccessfully logged in',
      },
    });
    yield put({
      type: TOKEN.SET_TOKEN_SUCCESS.type,
      data: {
        [TOKEN.SET_TOKEN_SUCCESS.value]:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NzQ5ZTdlYS0zMTNiLTQ1MTYtODgwOS1mNGFiMzk1NzUyZmMiLCJ2YWxpZFRpbGwiOiIyMDIzLTA5LTE3VDAwOjA4OjU4LjU4MDA5Ni0wNjowMCIsImlwQWRkcmVzcyI6IjQ5LjM3LjguMTY2In0.Wu6NQlh1uvBcnQnE1xbQe6YoVN69EPh9t_DJ_zjiuQQ',
      },
    });

    yield call(
      EncryptedStorage.setItem,
      constants.TOKEN,
      JSON.stringify({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NzQ5ZTdlYS0zMTNiLTQ1MTYtODgwOS1mNGFiMzk1NzUyZmMiLCJ2YWxpZFRpbGwiOiIyMDIzLTA5LTE3VDAwOjA4OjU4LjU4MDA5Ni0wNjowMCIsImlwQWRkcmVzcyI6IjQ5LjM3LjguMTY2In0.Wu6NQlh1uvBcnQnE1xbQe6YoVN69EPh9t_DJ_zjiuQQ',
      }),
    );
  } catch (error) {
    yield put({
      type: AUTH.LOGIN_FAILURE.type,
      data: {error: error},
    });
  }
}

function* userLogout(action) {
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

function* signUp(action) {
  try {
    console.log('Signup');
    let response = yield call(POST, 'auth/register-sso', action.payload, '');
    console.log('res', response);
    yield put({
      type: AUTH.SIGNUP_SUCCESS.type,
      data: {
        [AUTH.SIGNUP_SUCCESS.value]: response,
        signupmessage: response.message,
      },
    });
    yield put({
      type: TOKEN.SET_TOKEN_SUCCESS.type,
      data: {[TOKEN.SET_TOKEN_SUCCESS.value]: response.token},
    });

    yield call(
      EncryptedStorage.setItem,
      constants.TOKEN,
      JSON.stringify({token: response.token}),
    );
  } catch (error) {
    yield put({
      type: AUTH.SIGNUP_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getSocialData(action) {
  try {
    yield put({
      type: AUTH.SOCIAL_DATA_SUCCESS.type,
      data: {
        [AUTH.SOCIAL_DATA_SUCCESS.value]: action.payload,
      },
    });
  } catch (error) {
    yield put({
      type: AUTH.SOCIAL_DATA_FAILURE.type,
      data: {error: error},
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(AUTH.LOGIN_REQUEST.type, getSignin);
    })(),
    (function* () {
      yield takeLatest(AUTH.LOGOUT_REQUEST.type, userLogout);
    })(),

    (function* () {
      yield takeLatest(AUTH.SIGNUP_REQUEST.type, signUp);
    })(),
    (function* () {
      yield takeLatest(AUTH.SOCIAL_DATA_REQUEST.type, getSocialData);
    })(),
  ],
};
