
import { useState, useEffect } from 'react';
import { useActions } from '../../store/hooks/useActions';

import {MAP_HEIGHT, MAP_WIDTH} from '../../config/constants'

import click from '../../assets/sounds/click.mp3';
import './game-result.styles.scss';

const initState = {
    height: 0,
    position: [280, 230]
}

const clickAudio = new Audio(click);

const GameResult = ({gameResultData}) => {
    const {resultText, game_over} = gameResultData;
    const [gameResultState, setGameResultState] = useState(initState);
    const [isRunningInterval, setIsRunningInterval] = useState(true);
    const [isRunningInterval_1, setIsRunningInterval_1] = useState(false);

    const {gameInit} = useActions();

    let interval = null, interval_1 = null;

    useEffect(() => {
        if (gameResultState.height >= MAP_HEIGHT) {
            setIsRunningInterval(false);
        }
    }, [gameResultState]);

    useEffect(() => {
        if (isRunningInterval) {
            interval = setInterval(() => {
                setGameResultState(gameResultState => ({
                    ...gameResultState,
                    height: gameResultState.height + 50
                }));
            }, 50);
        }
        else {
            setGameResultState(gameResultState => ({
                ...gameResultState,
                height: MAP_HEIGHT
            }))
            clearInterval(interval);
            setIsRunningInterval_1(true);
        }
        
        return () => clearInterval(interval);
    }, [isRunningInterval]);

    useEffect(() => {
        if (isRunningInterval_1)
            interval_1 = setInterval(() => moveHeader(), 500);
        return () => clearInterval(interval_1);
    }, [isRunningInterval_1]);

    const moveHeader = () => {
        const random1 = Math.random();
        const random2 = Math.random();

        const newPos = [random1*500, random2*480];
        setGameResultState(gameResultState => ({
            ...gameResultState,
            position: newPos
        }))
    };

    const gameRestart = () => {
        clickAudio.play();
        gameInit();
    };

    return (
        <div className='game-result-container' style={{
            height: gameResultState.height,
            width: MAP_WIDTH,
            color: game_over? 'red':'green'
        }}>
            <h1 style={{
                position: 'relative',
                top: gameResultState.position[1],
                left: gameResultState.position[0],
            }}>{resultText}</h1>
            <button onClick={() => gameRestart()}>RESTART</button>
        </div>
    )
};

export default GameResult;