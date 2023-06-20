import {takeLatest, put} from 'redux-saga/effects';
import {ADD_SUPPLY} from '../redux/store/TypeConstants';

function* saveSupplyData(action) {
  yield put({
    type: ADD_SUPPLY.SAVE_ADD_SUPPLY_SUCCESS.type,
    data: action.payload,
  });
}

function* updateSupplyData(action) {
  yield put({
    type: ADD_SUPPLY.UPDATE_ADD_SUPPLY_SUCCESS.type,
    data: action.payload,
  });
}

function* resetSupplyData() {
  yield put({
    type: ADD_SUPPLY.RESET_ADD_SUPPLY_SUCCESS.type,
  });
}

function* incrementCounterData(action) {
  yield put({
    type: ADD_SUPPLY.INCREMENT_COUNTER_SUCCESS.type,
    data: action.payload,
  });
}

function* decrementCounterData(action) {
  yield put({
    type: ADD_SUPPLY.DECREMENT_COUNTER_SUCCESS.type,
    data: action.payload,
  });
}

export default {
  source: [
    (function* () {
      yield takeLatest(ADD_SUPPLY.SAVE_ADD_SUPPLY_REQUEST.type, saveSupplyData);
    })(),
    (function* () {
      yield takeLatest(
        ADD_SUPPLY.UPDATE_ADD_SUPPLY_REQUEST.type,
        updateSupplyData,
      );
    })(),
    (function* () {
      yield takeLatest(
        ADD_SUPPLY.RESET_ADD_SUPPLY_REQUEST.type,
        resetSupplyData,
      );
    })(),
    (function* () {
      yield takeLatest(
        ADD_SUPPLY.INCREMENT_COUNTER_REQUEST.type,
        incrementCounterData,
      );
    })(),
    (function* () {
      yield takeLatest(
        ADD_SUPPLY.DECREMENT_COUNTER_REQUEST.type,
        decrementCounterData,
      );
    })(),
  ],
};
