import {ADD_SUPPLY} from '../store/TypeConstants';

const initialState = [];

const AddSupplyReducer = (state = initialState, action) => {
  if (
    ADD_SUPPLY.SAVE_ADD_SUPPLY_SUCCESS.type.toString() ===
    action.type.toString()
  ) {
    console.log('action.data', action.data);
    return [...state, ...action.data];
  } else if (
    ADD_SUPPLY.UPDATE_ADD_SUPPLY_SUCCESS.type.toString() ===
    action.type.toString()
  ) {
    return state.map((item, index) => {
      if (action.data.index === index) {
        return action.data.payload;
      }
      return item;
    });
  } else if (
    ADD_SUPPLY.RESET_ADD_SUPPLY_SUCCESS.type.toString() ===
    action.type.toString()
  ) {
    return [];
  } else if (
    ADD_SUPPLY.INCREMENT_COUNTER_SUCCESS.type.toString() ===
    action.type.toString()
  ) {
    return state.map((item, index) => {
      if (action.data === index) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
  } else if (
    ADD_SUPPLY.DECREMENT_COUNTER_SUCCESS.type.toString() ===
    action.type.toString()
  ) {
    return state.map((item, index) => {
      if (action.data === index) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
  } else {
    return [...state];
  }
};

export default AddSupplyReducer;
