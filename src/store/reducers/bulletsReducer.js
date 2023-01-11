import {ADD_BULLETS, REMOVE_BULLETS, ADD_LAST_BULLET_FRAME_ID} from '../../config/types';

const intialState = {
    bullets: []
}

export const bulletsReducer = (state=intialState, action) => {
    switch(action.type) {
        case ADD_BULLETS:
            // return action.payload;
            return Object.assign({}, state, {
                bullets: [...state.bullets, action.payload]
            })
            // {
            //     tiles: action.payload
            // }
        case REMOVE_BULLETS:
            return action.payload;
            // return {
            //     ...action.payload
            // }
        case ADD_LAST_BULLET_FRAME_ID:
            return action.payload;
        //     return {
        //         ...action.payload
        //     }
        default:
            return state
    }
}