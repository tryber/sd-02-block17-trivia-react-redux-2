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

const loadQuestions = (finalLink) => (
  async (dispatch) => {
    dispatch(apiRequest());
    const token = await getTokenTriviaAPI();
    finalLink = `${finalLink}&token=${token.token}`;
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
