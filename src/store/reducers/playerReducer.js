import {ADD_PLAYER, MOVE_PLAYER, HIDE_PLAYER, IS_SHOOTED_PLAYER} from '../../config/types'

const initState = {
    position: [],
    direction: '',
    // spriteLocation: '',
    walkIndex: 0,
    hidden: true,
    isShooted: false,
    // bullets: []

    // position: [280, 460],
    // spriteLocation: '0px 60px',
    // direction: 'NORTH',
    // walkIndex: 0,
    // bullets: []
}

export const playerReducer = (state=initState, action) => {
    switch(action.type) {
        case ADD_PLAYER:
            return {...state, ...action.payload};
        case MOVE_PLAYER:
            return {...state, ...action.payload};
        case HIDE_PLAYER:
            return {
                ...state,
                hidden: action.payload
            }
        case IS_SHOOTED_PLAYER:
            return {
                ...state,
                isShooted: action.payload
            }
        default:
            return state;
    }
}