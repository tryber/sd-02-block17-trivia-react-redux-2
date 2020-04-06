import * as types from './actionTypes';
import playerCleanupAction from '../actions/playerCleanupAction';

function updateSettingsCategories(settings) {
  const { category, difficulty, type } = settings;
  return {
    type: types.CHANGE_SETTINGS,
    response: 0,
    settings: {
      category,
      difficulty,
      type,
    },
  };
}

const updateSettings = (settings) => (
  (dispatch) => {
    dispatch(updateSettingsCategories(settings));
    dispatch({ type: 'CLEAR_REQUEST' });
    return dispatch(playerCleanupAction());
  }
);

export default updateSettings;
