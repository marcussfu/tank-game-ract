import {GAME_OVER, GAME_WIN, GAME_START, GAME_INIT, SHORT_OF_TIME} from '../../config/types';

export const gameOver = () => ({
    type: GAME_OVER
});

export const gameWin = () => ({
    type: GAME_WIN
});

export const gameStart = () => ({
    type: GAME_START
});

export const gameInit = () => ({
    type: GAME_INIT
});

export const shortOfTime = () => ({
    type: SHORT_OF_TIME
});