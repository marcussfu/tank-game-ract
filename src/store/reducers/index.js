import {combineReducers} from 'redux';

import {mapReducer} from './mapReducer';
import {tankReducer} from './tankReducer';
import {bulletsReducer} from './bulletsReducer';
import {worldReducer} from './worldReducer';
import {playerReducer} from './playerReducer';

const rootReducer = combineReducers({mapReducer, tankReducer, 
    bulletsReducer, worldReducer, playerReducer});

export default rootReducer;