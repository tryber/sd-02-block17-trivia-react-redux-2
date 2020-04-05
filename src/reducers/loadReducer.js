import * as types from '../actions/actionTypes';

const initialState = {
  data: [],
  dataMock: [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the first weapon you acquire in Half-Life?',
      correct_answer: 'A crowbar',
      incorrect_answers: [
        'A pistol',
        'The H.E.V suit',
        'Your fists',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'boolean',
      difficulty: 'hard',
      question: 'TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy',
      correct_answer: 'False',
      incorrect_answers: [
        'True',
      ],
    },
  ],
  player: [
    { name: {} },
    { token: '' },
  ],
  isLoading: false,
  error: '',
  errorCategory: '',
  settings: [],
};

function loadAPI(state, action) {
  return {
    ...state,
    data: action.data,
    // dataMock: action.dataMock,
    isLoading: false,
  };
}

function loadToken(state, action) {
  return {
    ...state,
    player: [
      { token: action.token },
    ],
    isLoading: false,
  };
}

function loadCategory(state, action) {
  return {
    ...state,
    categoryLoad: action.categoryLoad,
    categories: action.categories,
    errorCategory: action.errorCategory,
  };
}

function updateSettings(state, action) {
  return {
    ...state,
    settings: action.settings,
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_API:
      return { ...state, isLoading: true };
    case types.LOAD_API:
      return loadAPI(state, action);
    case types.LOAD_USER:
      return loadToken(state, action);
    case types.FAIL_API:
      return { ...state, isLoading: false, error: action.error };
    case types.LOAD_CATEGORIES:
      return loadCategory(state, action);
    case types.FAIL_CATEGORIES:
      return { ...state, errorCategory: action.errorCategory };
    case types.CHANGE_SETTINGS:
      return updateSettings(state, action);
    default:
      return state;
  }
}
