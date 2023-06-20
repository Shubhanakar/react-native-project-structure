import {SETTINGS} from '../store/TypeConstants';

const initialState = {
  status: '',
  error: '',
  loading: false,
};

const SettingsReducer = (state = initialState, action) => {
  if (SETTINGS[action.type]) {
    if (action.type.toString().endsWith('_REQUEST')) {
      return {
        ...state,
        loading: true,
        status: SETTINGS[action.type].type,
      };
    }
    return {
      ...state,
      loading: false,
      ...action.data,
      status: SETTINGS[action.type].type,
    };
  } else if (action.type == 'RESET') {
    return {
      status: '',
      error: '',
      loading: false,
    };
  } else {
    return {
      ...state,
    };
  }
};

export default SettingsReducer;
