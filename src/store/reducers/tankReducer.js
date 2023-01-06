import {ADD_TANK, UPDATE_TANK, REMOVE_TANK} from '../../config/types';

const intialState = {
    tanks: []
}

export const tankReducer = (state=intialState, action) => {
    switch(action.type) {
        case ADD_TANK:
            return Object.assign({}, state, {
                tanks: [...state.tanks, action.payload]
            })
        case UPDATE_TANK:
            return Object.assign({}, state, {
                tanks: 
                    state.tanks.map((tank, index) => {
                    if (index === action.index) {
                        return Object.assign({}, tank, {
                            ...tank.key_index,
                            position: action.position, 
                            direction: action.direction
                        })
                    }
                    return tank
                })
            })
        case REMOVE_TANK:
            let tanks = state.tanks.filter( (tank, index) => index !== action.index)      
            return Object.assign({}, state, {
                tanks: 
                tanks.map((tank, index) => {
                    return {
                    position: tank.position,
                    direction: tank.direction,
                    key_index: Date.now() + index
                    }       
                })
            })
        // case ADD_MAP_BULLETS:
        //     return {
        //         ...action.payload
        //     }
        default:
            return state
    }
}