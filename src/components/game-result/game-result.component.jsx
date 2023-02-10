
import { useEffect, Fragment } from 'react';
import {useSelector} from 'react-redux';
import { useActions } from '../../store/hooks/useActions';

import game_over_bgm from '../../assets/sounds/game_over_bgm.mp3';
import click from '../../assets/sounds/click.mp3';
import './game-result.styles.scss';

const GameResult = ({resultText}) => {
    const {game_over} = useSelector(state => state.worldReducer);
    const {bgVolume, effectVolume} = useSelector(state => state.settingReducer);
    const {gameInit} = useActions();

    const gameOverAudio = new Audio(game_over_bgm);
    const clickAudio = new Audio(click);

    useEffect(() => {
        gameOverAudio.volume = bgVolume;
        gameOverAudio.play();

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleMouseDown);
        }
    }, []);

    const handleKeyDown = (e) => {
        e.preventDefault();
        switch (e.keyCode) {
            case 13:
                return gameRestart();
        }
    }

    const handleMouseDown = () => {
        gameRestart();
    };

    const gameRestart = () => {
        clickAudio.volume = effectVolume;
        clickAudio.play();
        gameInit();
    };

    return (
        <div className='game-result-container' style={{color: game_over? 'red':'green'}}>
            {game_over?
                <Fragment>
                    <div className='result-text'>GAME</div>
                    <div className='result-text'>OVER</div>
                </Fragment>:
                <Fragment>
                    <div className='result-text'>YOU</div>
                    <div className='result-text'>WIN</div>
                </Fragment>
            }
        </div>
    )
};

export default GameResult;