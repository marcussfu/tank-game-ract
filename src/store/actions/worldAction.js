import {GAME_OVER, GAME_WIN, GAME_START, GAME_INIT, GAME_PAUSE, SHORT_OF_TIME} from '../../config/types';

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

export const gamePause = () => ({
    type: GAME_PAUSE
});

export const shortOfTime = () => ({
    type: SHORT_OF_TIME
});