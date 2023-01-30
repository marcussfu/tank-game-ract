
import { useActions } from '../../store/hooks/useActions';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import game_start_bgm from '../../assets/sounds/game_start_bgm.mp3';
import click from '../../assets/sounds/click.mp3';

import './game-start.styles.scss';

const gameStartAudio = new Audio(game_start_bgm);
const clickAudio = new Audio(click);

const GameStart = () => {
    const {gameStart} = useActions();
    const {game_start} = useSelector(state => state.worldReducer);
    const [isShowStartBtn, setIsShowStartBtn] = useState(true);

    useEffect(() => {
        setIsShowStartBtn(!game_start);
    }, [game_start]);

    useEffect(() => {
        document.getElementById('gameStartBtn').disabled = !isShowStartBtn;
        if (!isShowStartBtn)
            document.getElementById('gameStartBtn').style = 'color:darkcyan';
    }, [isShowStartBtn]);

    const gameStartAction = () => {
        setIsShowStartBtn(false);
        clickAudio.play();
        gameStartActionSetTimeOut();
    };

    const gameStartActionSetTimeOut = () => {
        setTimeout(() => {
            gameStartAudio.play();
            gameStartActionSetTimeOut_1();
        }, 1200);
    };

    const gameStartActionSetTimeOut_1 = () => {
        setTimeout(() => {
            gameStart();
        }, 5000);
    };

    return (
        <div className='game-start-container'>
            <h1 className='title'>TANK WAR</h1>
            <div id='gameStartBtn' onClick={() => gameStartAction()}>START</div>
        </div>
    )
};

export default GameStart;