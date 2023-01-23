import {GAME_OVER, GAME_WIN, GAME_START, GAME_INIT} from '../../config/types';

const intialState = {
    game_over: false,
    game_win: false,
    game_start: false,
}

export const worldReducer = (state=intialState, action) => {
    switch(action.type) {
        case GAME_OVER:
            return {
                ...state,
                game_over: true
            };
        case GAME_WIN:
            return {
                ...state,
                game_win: true
            };
        case GAME_START:
            return {
                ...state,
                game_start: true
            };
        case GAME_INIT:
            return {
                game_start: false,
                game_over: false,
                game_win: false
            };
        default:
            return state
    }
}