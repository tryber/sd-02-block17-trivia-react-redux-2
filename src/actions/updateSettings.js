import * as types from './actionTypes';

function updateSettingsCategories(settings) {
  const { category, difficulty, type } = settings;
  return {
    type: types.CHANGE_CATEGORY,
    settings: [
      category,
      difficulty,
      type,
    ],
  };
}

const updateSettings = (settings) => (
  (dispatch) => {
    return dispatch(updateSettingsCategories(settings))
  }
);

export default updateSettings;
