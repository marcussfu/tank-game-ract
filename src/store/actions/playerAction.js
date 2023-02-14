import {ADD_PLAYER, HIDE_PLAYER, MOVE_PLAYER, IS_SHOOTED_PLAYER, SET_NEW_DIR} from '../../config/types';

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

export const isShootedPlayer = (player) => ({
    type: IS_SHOOTED_PLAYER,
    payload: player
});

export const setNewDir = (player) => ({
    type: SET_NEW_DIR,
    payload: player
});