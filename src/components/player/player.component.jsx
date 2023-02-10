import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';
import { useState, useEffect } from 'react';

import {getCurrentPosition, obeserveBoundaries, directionToRotateDegree} from '../../config/functions';
import store from '../../store/store';
import playerTank from '../../assets/tank/playerTank.png';

import {SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH} from '../../config/constants';
import './player.styles.scss';

const Player = ({player, fireHandler, moveHandler, stopHandler}) => {
    const {position, direction, spriteLocation, walkIndex, rotate, posRatio} = player;
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        setHidden(false);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, []);
    
    const handleKeyDown = (e) => {
        e.preventDefault();
        // get current state
        if (!store.getState().worldReducer.game_over && 
            !store.getState().worldReducer.game_win) {
            switch (e.keyCode) {
                // case 32:
                //     return setBulletShootedCount(bulletShootedCount => bulletShootedCount+1);
                case 37: case 65:
                    return moveHandler('WEST');
                case 38: case 87:
                    return moveHandler('NORTH');
                case 39: case 68:
                    return moveHandler('EAST');
                case 40: case 83:
                    return moveHandler('SOUTH');
                // default:
                //     return console.log(e.keyCode);
            }
        }
    }

    const handleKeyUp = (e) => {
        e.preventDefault();
        // get current state
        if (!store.getState().worldReducer.game_over && 
            !store.getState().worldReducer.game_win) {
            stopHandler();
            switch (e.keyCode) {
                case 32: case 13:
                    return fireHandler();
                //     return setBulletShootedCount(bulletShootedCount => bulletShootedCount+1);
                // default:
                //     return console.log(e.keyCode);
            }
        }
    }
    
    return (
        <div className='player' style={{
            top: position[1]*posRatio.heightRatio,
            left: position[0]*posRatio.widthRatio,
            display: hidden? 'none': 'block',
            backgroundImage: `url(${playerTank})`,
            transform: `rotate(${rotate}deg)`
        }}/>
    )
}

export default Player;