import {SET_BG_VOLUME, SET_SHOOT_VOLUME} from '../../config/types';

export const setBgVolume = (value) => ({
    type: SET_BG_VOLUME,
    payload: value
});

export const setShootVolume = (value)=> ({
    type: SET_SHOOT_VOLUME,
    payload: value
});