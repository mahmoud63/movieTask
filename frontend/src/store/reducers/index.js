import { combineReducers } from 'redux';

import templateReducer from './templateReducer';
import authReducer from './authReducer';

export default combineReducers({
  template: templateReducer,
  auth: authReducer,
});
