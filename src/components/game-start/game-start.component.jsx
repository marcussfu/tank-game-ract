
import { useActions } from '../../store/hooks/useActions';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Button from '../../components/button/button.component';

import playerTank from '../../assets/tank/playerTank.png';

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
        if (!isShowStartBtn) {
            document.getElementById('title').style.cssText += 'animation: disappear 8s;';
            document.getElementById('gameStartBtn').style.cssText += 'animation: disappear 8s;';
        }
    }, [isShowStartBtn]);

    const gameStartAction = () => {
        if (!isShowStartBtn) return;
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
            <h1 id='title'>TANK WAR</h1>
            <Button id='gameStartBtn' onClick={() => gameStartAction()}>START</Button>
            {!isShowStartBtn && <div className='tank-animation' style={{
                backgroundImage: `url(${playerTank})`
            }}/>}
        </div>
    )
};

export default GameStart;