import {combineReducers} from 'redux';

import {mapReducer} from './mapReducer';
import {tankReducer} from './tankReducer';

const rootReducer = combineReducers({mapReducer, tankReducer});

export default rootReducer;