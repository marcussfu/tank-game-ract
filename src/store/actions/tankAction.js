import {ADD_TANK, UPDATE_TANK, REMOVE_TANK} from '../../config/types';

export const setTank = (tank) => ({
    type: ADD_TANK,
    payload: tank
});

export const updateTank = (tank) => ({
    type: UPDATE_TANK,
    payload: tank
});

export const removeTank = (tank) => ({
    type: REMOVE_TANK,
    payload: tank
});