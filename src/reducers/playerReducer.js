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
  }

  return state;
};

export default userReducer;
