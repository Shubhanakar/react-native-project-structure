import {combineReducers} from 'redux';
import TokenReducer from './TokenReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import JobReducer from './JobReducer';
import AddSupplyReducer from './AddSupplyReducer';

const allReducers = combineReducers({
  TokenReducer: TokenReducer,
  AuthReducer: AuthReducer,
  ProfileReducer: ProfileReducer,
  JobReducer: JobReducer,
  AddSupplyReducer: AddSupplyReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
