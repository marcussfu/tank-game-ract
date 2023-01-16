import {GAME_OVER, GAME_WIN} from '../../config/types';

export const gameOver = () => ({
    type: GAME_OVER
});

export const gameWin = () => ({
    type: GAME_WIN
});