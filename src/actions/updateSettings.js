import * as types from './actionTypes';

function updateSettingsCategories(settings) {
  const { category, difficulty, type } = settings;
  return {
    type: types.CHANGE_SETTINGS,
    settings: {
      category,
      difficulty,
      type,
    },
  };
}

const updateSettings = (settings) => (
  (dispatch) => dispatch(updateSettingsCategories(settings))
);

export default updateSettings;
