import {all} from 'redux-saga/effects';

import TOKEN_SAGA from './TokenSaga';
import AUTH_SAGA from './AuthSaga';
import PROFILE_SAGA from './ProfileSaga';
import JOB_SAGA from './JobSaga';
import SETTINGS_SAGA from './SettingsSaga';
import ADD_SUPPLY_SAGA from './AddSupplySaga';

function* RootSaga() {
  yield all([
    ...TOKEN_SAGA.source,
    ...AUTH_SAGA.source,
    ...PROFILE_SAGA.source,
    ...JOB_SAGA.source,
    ...SETTINGS_SAGA.source,
    ...ADD_SUPPLY_SAGA.source,
  ]);
}

export default RootSaga;
