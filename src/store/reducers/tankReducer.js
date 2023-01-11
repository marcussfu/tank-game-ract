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
                    state.tanks.map(tank => {
                        if (tank.key_index === action.payload.key_index) {
                            return Object.assign({}, tank, action.payload)
                        }
                        return tank
                    })
            })
        case REMOVE_TANK:
            return Object.assign({}, state, {
                tanks:
                    state.tanks.filter(tank => tank.key_index !== action.payload) 
            })
        // case ADD_MAP_BULLETS:
        //     return {
        //         ...action.payload
        //     }
        default:
            return state
    }
}