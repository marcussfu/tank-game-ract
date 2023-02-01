import {SET_BG_VOLUME, SET_SHOOT_VOLUME} from '../../config/types';

const intialState = {
    bgVolume: 0,
    shootVolume: 1,
}

export const settingReducer = (state=intialState, action) => {
    switch(action.type) {
        case SET_BG_VOLUME:
            return {
                ...state,
                bgVolume: action.payload
            }
        case SET_SHOOT_VOLUME:
            return {
                ...state,
                shootVolume: action.payload
            }
        default:
            return state
    }
}