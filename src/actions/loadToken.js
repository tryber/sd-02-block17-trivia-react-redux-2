import * as types from '../actions/actionTypes';
import getTokenTriviaAPI from '../service/tokenAPI';

function apiSucess(infos) {
  return {
    type: types.LOAD_USER,
    token: infos,
    load: true,
  };
}

function apiFailure(error) {
  return {
    type: types.FAIL_API,
    error,
  };
}

const loadQuestions = () => (
  (dispatch) => (
    getTokenTriviaAPI()
      .then(
        (infos) => dispatch(apiSucess(infos)),
        (error) => dispatch(apiFailure(error.message)),
      )
  )
);

export default loadQuestions;
