import {GAME_OVER, GAME_WIN, GAME_START, GAME_INIT, GAME_PAUSE, SHORT_OF_TIME} from '../../config/types';

const intialState = {
    game_over: false,
    game_win: false,
    game_start: false,
    game_pause: false,
    shot_of_time: false,
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
        case SHORT_OF_TIME:
            return {
                ...state,
                short_of_time: true
            };
        case GAME_PAUSE:
            return {
                ...state,
                game_pause: action.payload
            };
        case GAME_INIT:
            return {
                shot_of_time: false,
                game_start: false,
                game_over: false,
                game_win: false,
                game_pause: false
            };
        default:
            return state
    }
}