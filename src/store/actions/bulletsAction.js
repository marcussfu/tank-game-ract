import {ADD_BULLET, REMOVE_BULLET, MOVE_BULLET} from '../../config/types';

export const setBullet = (bullet) => ({
    type: ADD_BULLET,
    payload: bullet
});

export const removeBullet = ()=> ({
    type: REMOVE_BULLET
});

export const moveBullet = (bullet)=> ({
    type: MOVE_BULLET,
    payload: bullet
});