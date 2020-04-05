import * as types from '../actions/actionTypes';

const playerState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = playerState, action) => {
  switch (action.type) {
    case types.CHANGE_USER_DATA:
      return {
        ...state,
        [action.name]: action.value,
      };
    case types.CLEAR_USER_DATA:
      return playerState;
    case 'CHANGE_PLACAR':
      return {
        ...state,
        assertions: state.assertions + 1,
        score: state.score + 10 + (action.time * action.difficulty),
      };
    default:
      return state;
  }
};

export default playerReducer;
