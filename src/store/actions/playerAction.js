import {ADD_PLAYER, HIDE_PLAYER, MOVE_PLAYER} from '../../config/types';

export const addPlayer = (player) => ({
    type: ADD_PLAYER,
    payload: player
});

export const movePlayer = (player) => ({
    type: MOVE_PLAYER,
    payload: player
});

export const hidePlayer = (player) => ({
    type: HIDE_PLAYER,
    payload: player
});