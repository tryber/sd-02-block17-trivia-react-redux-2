import * as types from './actionTypes';
import getEndPointTrivia from '../service/triviaAPI';

function apiRequest() {
  return {
    type: types.REQUEST_API,
  };
}

function apiSuccess(infos) {
  return {
    type: types.LOAD_API,
    data: infos,
  };
}

function apiFailure(error) {
  return {
    type: types.FAIL_API,
    error,
  };
}

const loadQuestions = (question) => (
  (dispatch) => {
    dispatch(apiRequest());
    return (
      getEndPointTrivia(question).then(
        (infos) => dispatch(apiSuccess(infos)),
        (error) => dispatch(apiFailure(error.message)),
      )
    );
  }
);

export default loadQuestions;