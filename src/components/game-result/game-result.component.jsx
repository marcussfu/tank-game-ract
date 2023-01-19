
import { useState, useEffect } from 'react';

import {MAP_HEIGHT, MAP_WIDTH} from '../../config/constants'
import './game-result.styles.scss';

const initState = {
    height: 0,
    position: [280, 230]
}

let interval = null;

const GameResult = ({gameResultData}) => {
    const {resultText, game_over} = gameResultData;
    const [gameResultState, setGameResultState] = useState(initState);

    useEffect(() => {
        interval = setInterval(() => {
            if (gameResultState.height >= MAP_HEIGHT) {
                setGameResultState(gameResultState => ({
                    ...gameResultState,
                    height: MAP_HEIGHT
                }))
                clearInterval(interval);
                setInterval(() => moveHeader(), 500);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const moveHeader = () => {
        const random1 = Math.random();
        const random2 = Math.random();

        const newPos = [random1*500, random2*480];
        setGameResultState(gameResultState => ({
            ...gameResultState,
            position: newPos
        }))
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
        </div>
    )
};

export default GameResult;