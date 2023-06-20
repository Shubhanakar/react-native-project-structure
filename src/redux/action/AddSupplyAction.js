import {ADD_SUPPLY} from '../store/TypeConstants';

export const saveSupplyData = payload => ({
  type: ADD_SUPPLY.SAVE_ADD_SUPPLY_REQUEST.type,
  payload,
});

export const updateSupplyData = payload => ({
  type: ADD_SUPPLY.UPDATE_ADD_SUPPLY_REQUEST.type,
  payload,
});

export const resetSupplyData = () => ({
  type: ADD_SUPPLY.RESET_ADD_SUPPLY_REQUEST.type,
});

export const incrementCounter = payload => ({
  type: ADD_SUPPLY.INCREMENT_COUNTER_REQUEST.type,
  payload,
});

export const decrementCounter = payload => ({
  type: ADD_SUPPLY.DECREMENT_COUNTER_REQUEST.type,
  payload,
});
