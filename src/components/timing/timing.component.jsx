
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useActions } from '../../store/hooks/useActions';

import {TIME_LIMIT} from '../../config/constants'
import './timing.styles.scss';

const Timing = () => {
    const {game_over, game_win} = useSelector(state => state.worldReducer);
    const [timeText, setTimeText] = useState(TIME_LIMIT);

    const {gameOver, removeTanks, removeBullet} = useActions();

    let interval = null;

    useEffect(() => {
        if (!game_over && !game_win) {
            interval = setInterval(() => {
                setTimeText(timeText => timeText - 1);
            }, 1000);
        }
        else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [game_over, game_win]);

    useEffect(() => {
        if (timeText < 1) {
            gameOver();
            removeTanks();
            removeBullet();
        }
    }, [timeText]);

    return (
        <div className='timing-container'>
            <h1>{timeText}</h1>
        </div>
    )
};

export default Timing;