import * as types from '../actions/actionTypes';

export const changeCategory = (questionCategory) => ({
  type: types.CHANGE_CATEGORY,
  questionCategory,
});

export const changeType = (questionType) => ({
  type: types.CHANGE_TYPE,
  questionType,
});

export const changeDifficulty = (questionDifficulty) => ({
  type: types.CHANGE_DIFFICULTY,
  questionDifficulty,
});
