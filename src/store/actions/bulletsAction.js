import {ADD_BULLET, REMOVE_BULLET} from '../../config/types';

export const setBullet = (bullets) => ({
    type: ADD_BULLET,
    payload: bullets
});

export const removeBullet = ()=> ({
    type: REMOVE_BULLET
});

// export const add_last_bullet_frame_id = (bullets)=> ({
//     type: ADD_LAST_BULLET_FRAME_ID,
//     payload: bullets
// });