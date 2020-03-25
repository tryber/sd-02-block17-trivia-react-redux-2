import * as types from '../actions/actionTypes';
import getEndPointTrivia from '../service/triviaAPI';

function apiSucess(infos) {
  return {
    type: types.LOAD_API,
    data: infos,
    dataMock: infos,
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
    getEndPointTrivia()
      .then(
        (infos) => dispatch(apiSucess(infos)),
        (error) => dispatch(apiFailure(error.message)),
      )
  )
);

export default loadQuestions;
