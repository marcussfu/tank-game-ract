import {ADD_TILES, UPDATE_TILES} from '../../config/types';

const intialState = {
    tiles: []
}

export const mapReducer = (state=intialState, action) => {
    switch(action.type) {
        case ADD_TILES:
            return {
                tiles: action.payload
                // ...state, tiles: action.payload
            }
        case UPDATE_TILES:
            return {
                ...action.payload
            }
        // case ADD_MAP_BULLETS:
        //     return {
        //         ...action.payload
        //     }
        default:
            return state
    }
}