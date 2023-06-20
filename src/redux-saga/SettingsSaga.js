import {put, call, takeLatest} from 'redux-saga/effects';

import {SETTINGS} from '../redux/store/TypeConstants';
import {POST} from './setup/method';

// function* getDefaultSettings(action) {
//   try {
//     yield put({
//       type: SETTINGS.GET_SETTINGS_SUCCESS.type,
//       data: {
//         [SETTINGS.GET_SETTINGS_SUCCESS.value]: action.payload,
//       },
//     });
//     // yield put({
//     //   type: JOB.GET_JOB_CHANGE_SUCCESS.type,
//     //   data: {[JOB.GET_JOB_CHANGE_SUCCESS.value]: action.payload},
//     // });

//     // yield call(
//     //   EncryptedStorage.setItem,
//     //   constants.JOB,
//     //   JSON.stringify({JOB: action.payload}),
//     // );
//   } catch (error) {
//     yield put({
//       type: SETTINGS.GET_SETTINGS_FAILURE.type,
//       data: {error: error},
//     });
//   }
// }

function* getDefaultSettings() {
  try {
    let response = yield call(GET, `client-profile`, yield getToken());

    yield put({
      type: SETTINGS.GET_SETTINGS_SUCCESS.type,
      data: {
        [SETTINGS.GET_SETTINGS_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SETTINGS.GET_SETTINGS_FAILURE.type,
      data: {error: error},
    });
  }
}

function* saveSettings() {
  try {
    let response = yield call(POST, `client-profile`, yield getToken());

    yield put({
      type: SETTINGS.SAVE_SETTINGS_SUCCESS.type,
      data: {
        [SETTINGS.SAVE_SETTINGS_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SETTINGS.SAVE_SETTINGS_FAILURE.type,
      data: {error: error},
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(SETTINGS.GET_SETTINGS_FAILURE.type, getDefaultSettings);
    })(),
    (function* () {
      yield takeLatest(SETTINGS.SAVE_SETTINGS_REQUEST.type, saveSettings);
    })(),
  ],
};
