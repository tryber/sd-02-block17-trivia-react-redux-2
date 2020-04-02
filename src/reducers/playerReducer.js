import * as types from '../actions/actionTypes';

const playerState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = playerState, action) => {
  switch(action.type) {
    case types.CHANGE_USER_DATA:
      return {
        ...state,
        [action.name]: action.value,
      };
    case types.CLEAR_USER_DATA:
      return playerState;
    default:
      return state;
  }
};

export default userReducer;
