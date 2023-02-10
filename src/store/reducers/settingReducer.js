import {SET_BG_VOLUME, SET_EFFECT_VOLUME} from '../../config/types';

const intialState = {
    bgVolume: 0.5,
    effectVolume: 0.3,
}

export const settingReducer = (state=intialState, action) => {
    switch(action.type) {
        case SET_BG_VOLUME:
            return {
                ...state,
                bgVolume: action.payload
            }
        case SET_EFFECT_VOLUME:
            return {
                ...state,
                effectVolume: action.payload
            }
        default:
            return state
    }
}