import {ADD_BULLET, REMOVE_BULLET, ADD_LAST_BULLET_FRAME_ID} from '../../config/types';

const intialState = {
    bullets: []
}

export const bulletsReducer = (state=intialState, action) => {
    switch(action.type) {
        case ADD_BULLET:
            // console.log("add_bullet    ", [...state.bullets, action.payload]);
            return Object.assign({}, state, {
                bullets: [...state.bullets, action.payload]
            })
        case REMOVE_BULLET:
            console.log("remove_bullet    ", state.bullets.filter(bullet => bullet.key_index !== action.payload) );
            return Object.assign({}, state, {
                bullets:
                    state.bullets.filter(bullet => bullet.key_index !== action.payload) 
            })
        case ADD_LAST_BULLET_FRAME_ID:
            return action.payload;
        //     return {
        //         ...action.payload
        //     }
        default:
            return state
    }
}