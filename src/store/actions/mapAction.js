import {ADD_TILES, UPDATE_TILES} from '../../config/types';

export const setTiles = (tiles) => ({
    type: ADD_TILES,
    payload: tiles
});

export const updateTiles = (tiles)=> ({
    type: UPDATE_TILES,
    payload: tiles
});