import { combineReducers } from 'redux';
import productReducer from './products';
import userReducer from './user';
import ordersReducer from './orders';

const rootReducer = combineReducers({ productReducer,
  userReducer,
  ordersReducer,
});

export default rootReducer;
