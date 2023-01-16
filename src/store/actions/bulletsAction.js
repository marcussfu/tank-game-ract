import {ADD_BULLET, REMOVE_BULLET, 
    ADD_LAST_BULLET_FRAME_ID} from '../../config/types';

export const setBullet = (bullets) => ({
    type: ADD_BULLET,
    payload: bullets
});

export const removeBullet = (bullets)=> ({
    type: REMOVE_BULLET,
    payload: bullets
});

export const add_last_bullet_frame_id = (bullets)=> ({
    type: ADD_LAST_BULLET_FRAME_ID,
    payload: bullets
});