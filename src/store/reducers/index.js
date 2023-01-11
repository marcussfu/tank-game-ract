import {combineReducers} from 'redux';

import {mapReducer} from './mapReducer';
import {tankReducer} from './tankReducer';
import {bulletsReducer} from './bulletsReducer';

const rootReducer = combineReducers({mapReducer, tankReducer, bulletsReducer});

export default rootReducer;