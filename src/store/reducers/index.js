import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import blog from './blog';

const reducers = combineReducers({
	blog,
	routing: routerReducer
});

export default reducers;
