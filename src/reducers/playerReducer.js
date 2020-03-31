import * as types from '../actions/actionTypes';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = initialState, action) => {
  if (action.type === types.CHANGE_USER_DATA) {
    return {
      ...state,
      [action.name]: action.value,
    };
  } else if (action.type === types.CLEAR_USER_DATA) {
    return initialState;
  }

  return state;
};

export default userReducer;
