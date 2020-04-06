import * as types from '../actions/actionTypes';

const initialState = {
  data: [],
  response: null,
  token: '',
  isLoading: false,
  error: null,
  errorCategory: null,
  settings: {
    category: '',
    difficulty: '',
    type: '',
  },
};

function loadAPI(state, action) {
  return {
    ...state,
    data: action.data,
    response: action.response,
    isLoading: action.isLoading,
  };
}

function loadToken(state, action) {
  return {
    ...state,
    token: action.token,
  };
}

function loadCategory(state, action) {
  return {
    ...state,
    categoryLoad: action.categoryLoad,
    categories: action.categories,
    errorCategory: action.errorCategory,
  };
}

function updateSettings(state, action) {
  return {
    ...state,
    response: action.response,
    settings: action.settings,
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
    case types.LOAD_CATEGORIES:
      return loadCategory(state, action);
    case types.FAIL_CATEGORIES:
      return { ...state, errorCategory: action.errorCategory };
    case types.CHANGE_SETTINGS:
      return updateSettings(state, action);
    case 'CLEAR_REQUEST':
      return { ...state, data: [], response: null };
    default:
      return state;
  }
}
