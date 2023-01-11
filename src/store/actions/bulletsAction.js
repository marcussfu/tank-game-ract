import {ADD_BULLETS, REMOVE_BULLETS, 
    ADD_LAST_BULLET_FRAME_ID} from '../../config/types';

export const setBullets = (bullets) => ({
    type: ADD_BULLETS,
    payload: bullets
});

export const removeBullets = (bullets)=> ({
    type: REMOVE_BULLETS,
    payload: bullets
});

export const add_last_bullet_frame_id = (bullets)=> ({
    type: ADD_LAST_BULLET_FRAME_ID,
    payload: bullets
});