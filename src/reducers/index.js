import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { todos, filter } from './todos.js';
import { rows, cols, matrix } from './gameOfLife.js';

const rootReducer = combineReducers({
  todos,
  filter,
  rows,
  cols,
  matrix,
  routing: routerReducer,
});

export default rootReducer;
