export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_TYPE = 'CHANGE_TYPE';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';

export const changeCategory = (questionCategory) => ({
  type: CHANGE_CATEGORY,
  questionCategory,
});

export const changeType = (questionType) => ({
  type: CHANGE_TYPE,
  questionType,
});

export const changeDifficulty = (questionDifficulty) => ({
  type: CHANGE_DIFFICULTY,
  questionDifficulty,
});
