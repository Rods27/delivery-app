import { ALL_ORDERS, ORDERS } from '../actions';

const INITIAL_STATE = {
  allOrders: [],
  orders: {},
};

export default function ordesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ORDERS: return {
    ...state,
    orders: action.payload,
  };
  case ALL_ORDERS:
    return {
      ...state, allOrders: action.payload,
    };
  default:
    return state;
  }
}
