import * as types from '../actions/actionTypes';
import initialState from './initalState';

function loadAPI(state, action) {
  return {
    ...state,
    data: action.data,
    dataMock: action.dataMock,
  };
}

function loadToken(state, action) {
  return {
    ...state,
    player: [
      {token: action.token},
    ],
  };
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_API:
      return loadAPI(state, action);
    case types.LOAD_USER:
      return loadToken(state, action);
    default:
      return state;
  }
}
