import * as types from '../actions/actionTypes';

const initialState = {
  data: [],
  dataMock: [],
  player: [
    { name: {} },
    { token: '' },
  ],
  isLoading: false,
  error: '',
};

function loadAPI(state, action) {
  return {
    ...state,
    data: action.data,
    dataMock: action.dataMock,
    isLoading: false,
  };
}

function loadToken(state, action) {
  return {
    ...state,
    player: [
      { token: action.token },
    ],
    isLoading: false,
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_API:
      return { ...state, isLoading: true };
    case types.LOAD_API:
      return loadAPI(state, action);
    case types.LOAD_USER:
      return loadToken(state, action);
    case types.FAIL_API:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
