import {JOB} from '../store/TypeConstants';

const initialState = {
  status: '',
  error: '',
  loading: false,
};

const JobReducer = (state = initialState, action) => {
  if (JOB[action.type]) {
    if (action.type.toString().endsWith('_REQUEST')) {
      return {
        ...state,
        loading: true,
        status: JOB[action.type].type,
      };
    }
    return {
      ...state,
      loading: false,
      ...action.data,
      status: JOB[action.type].type,
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

export default JobReducer;
