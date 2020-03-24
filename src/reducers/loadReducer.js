import * as types from '../actions/actionTypes';
import initialState from './initalState';

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_API:
      return state;
    case types.LOAD_USER:
    return state;
    default:
      return state;
  }
}
