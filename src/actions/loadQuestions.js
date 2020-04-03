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
    dataMock: infos,
  };
}

function chargeToken(token) {
  return {
    type: types.LOAD_USER,
    token: { token },
  };
}

function apiFailure(error) {
  return {
    type: types.FAIL_API,
    error,
  };
}

const loadQuestions = (finalLink, token) => (
  (dispatch) => {
    dispatch(apiRequest());
    dispatch(chargeToken(token));
    return (
      getEndPointTrivia(finalLink).then(
        (infos) => dispatch(apiSuccess(infos)),
        (error) => dispatch(apiFailure(error.message)),
      )
    );
  }
);

export default loadQuestions;
