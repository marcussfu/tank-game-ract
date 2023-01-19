import {GAME_OVER, GAME_WIN} from '../../config/types';

const intialState = {
    game_over: false,
    game_win: false
}

export const worldReducer = (state=intialState, action) => {
    switch(action.type) {
        case GAME_OVER:
            console.log("OOOVVVVEEERRR");
            return {
                game_over: true
            };
        case GAME_WIN:
            console.log("WWWWWWIIINNNN");
            return {
                game_win: true
            };
        default:
            return state
    }
}