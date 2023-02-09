
import { useActions } from '../../store/hooks/useActions';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Button from '../../components/button/button.component';

import titleImg from '../../assets/scene/title.png';
import selectItemTank from '../../assets/scene/select-item-tank.png';

import game_start_bgm from '../../assets/sounds/game_start_bgm.mp3';
import click from '../../assets/sounds/click.mp3';

import './game-start.styles.scss';

const gameStartAudio = new Audio(game_start_bgm);
const clickAudio = new Audio(click);

const GameStart = () => {
    const {gameStart} = useActions();
    const {game_start} = useSelector(state => state.worldReducer);
    const [isShowStartBtn, setIsShowStartBtn] = useState(true);
    const [selectPlayerCount, setSelectPlayerCount] = useState(1);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    useEffect(() => {
        setIsShowStartBtn(!game_start);
    }, [game_start]);

    useEffect(() => {
        // if (!isShowStartBtn) {
        //     document.getElementById('title').style.cssText += 'animation: disappear 8s;';
        //     document.getElementById('gameStartBtn').style.cssText += 'animation: disappear 8s;';
        // }

        if (selectPlayerCount === 1) {
            document.getElementById('1p').style.visibility='visible';
            document.getElementById('2p').style.visibility='hidden';
        }
        else if (selectPlayerCount === 2) {
            document.getElementById('1p').style.visibility='hidden';
            document.getElementById('2p').style.visibility='visible';
        }
    }, [selectPlayerCount]);

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

    const selectGameStartAction = () => {
        if (document.getElementById('1p').style.visibility === 'visible')
            gameStartAction();
        else if (document.getElementById('2p').style.visibility === 'visible')
            console.log("2p");

        window.removeEventListener('keydown', handleKeyDown);
        document.getElementById('game-start-btn-1').disabled = true;
        document.getElementById('game-start-btn-2').disabled = true;
    }

    const handleKeyDown = (e) => {
        e.preventDefault();
        switch (e.keyCode) {
            case 13:
                return selectGameStartAction();
            case 38: case 87:
                return setSelectPlayerCount(1);
            case 40: case 83:
                return setSelectPlayerCount(2);
        }
    }

    const clickItem = (item) => {
        setSelectPlayerCount(item);
        setTimeout(() => {
            selectGameStartAction();
        }, 100);
    }

    return (
        <div className='game-start-container'>
            <img className='title' src={titleImg} alt='title' />
            <div id='game-start-button-container-id' className='game-start-button-container'>
                <div className='game-start-button-content-container'>
                    <div id='1p' className='select-item-tank1' style={{backgroundImage: `url(${selectItemTank})`}}/>
                    <Button id='game-start-btn-1' onClick={() => clickItem(1)}>1 PLAYER</Button>
                </div>
                <div className='game-start-button-content-container'>
                    <div id='2p' className='select-item-tank2' style={{backgroundImage: `url(${selectItemTank})`}}/>
                    <Button id='game-start-btn-2' onClick={() => clickItem(2)}>2 PLAYERS</Button>
                </div>
            </div>
            {/* {!isShowStartBtn && <div className='tank-animation' style={{
                backgroundImage: `url(${playerTank})`
            }}/>} */}
        </div>
    )
};

export default GameStart;