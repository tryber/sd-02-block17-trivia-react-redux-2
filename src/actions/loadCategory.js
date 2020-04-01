import * as types from '../actions/actionTypes';
import getEndPointTrivia from '../service/triviaAPI';

function categorySuccess(infos) {
  return {
    type: types.LOAD_CATEGORIES,
    categories: infos,
    categoryLoad: true,
  };
}

function categoryFailure(errorCategory) {
  return {
    type: types.FAIL_CATEGORIES,
    errorCategory,
  };
}

const loadCategory = (categories) => ((dispatch) => (
  getEndPointTrivia(categories).then(
    (infos) => dispatch(categorySuccess(infos)),
    (error) => dispatch(categoryFailure(error.message)),
  )
));

export default loadCategory;
