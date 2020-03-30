import { combineReducers } from 'redux';

import loadReducer from './loadReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  loadReducer,
  player: playerReducer,
});

export default rootReducer;
