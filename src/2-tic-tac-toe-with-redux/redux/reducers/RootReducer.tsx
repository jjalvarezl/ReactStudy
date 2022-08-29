import { combineReducers } from 'redux';

import GameReducer from './GameReducer';

const RootReducer = combineReducers({
  gameReducer: GameReducer,
});

export default RootReducer;