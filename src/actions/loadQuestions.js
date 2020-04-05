import * as types from './actionTypes';
import getEndPointTrivia from '../service/triviaAPI';
import getTokenTriviaAPI from '../service/tokenAPI';

function apiRequest() {
  return {
    type: types.REQUEST_API,
  };
}

function apiSuccess(infos) {
  return {
    type: types.LOAD_API,
    data: infos.results,
    response: infos.response_code,
    isLoading: false,
  };
}

function chargeToken(results) {
  return {
    type: types.LOAD_USER,
    token: results.token,
  };
}

function apiFailure(error) {
  return {
    type: types.FAIL_API,
    error,
  };
}

const loadQuestions = (finalLink) => (
  async (dispatch) => {
    dispatch(apiRequest());
    const results = await getTokenTriviaAPI();
    const newLink = (`${finalLink}&token=${results.token}`);
    dispatch(chargeToken(results));
    return (
      getEndPointTrivia(newLink).then(
        (infos) => dispatch(apiSuccess(infos)),
        (error) => dispatch(apiFailure(error.message)),
      )
    );
  }
);

export default loadQuestions;
