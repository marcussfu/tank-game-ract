import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';
import { useState, useEffect } from 'react';
import {getCurrentPosition, obeserveBoundaries, directionToRotateDegree} from '../../config/functions';
import store from '../../store/store';

import playerTank from '../../assets/tank/playerTank.png';

import {SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH} from '../../config/constants';
import './player.styles.scss';

const Player = () => {
    const {position, direction, walkIndex, hidden, isShooted, newDir} = useSelector(state => state.playerReducer);
    const tiles = useSelector(state => state.mapReducer.tiles);
    const {setTiles, removeTanks, gameWin, movePlayer, hidePlayer, setBullet, isShootedPlayer, setNewDir} = useActions();
    
    const [rotate, setRotate] = useState(0);
    const [moveQueue, setMoveQueue] = useState([]);
    const [moveSpeed, setMoveSpeed] = useState(200);
    const [posRatio, setPosRatio] = useState({widthRatio: 1, heightRatio: 1});

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    let interval_newDir = null;

    useEffect(() => {
        setPosRatio({
            widthRatio: document.getElementsByClassName('playground-container')[0].offsetWidth/MAP_WIDTH,
            heightRatio: document.getElementsByClassName('playground-container')[0].offsetHeight/MAP_HEIGHT
        });

        if (direction !== '') 
            hidePlayer(false);
    }, [direction])

    useEffect(() => {
        if (moveQueue.length > 0)
            attemptMove(moveQueue.shift());
    }, [moveQueue]);

    useEffect(() => {
        if (newDir !== '') {
            setMoveQueue(moveQueue => [...moveQueue, newDir]);
            interval_newDir = setInterval(() => {
                setMoveQueue(moveQueue => [...moveQueue, newDir]);
            }, moveSpeed);
        }

        return () => {
            setMoveQueue([]);
            clearInterval(interval_newDir);
        }
    }, [newDir, moveSpeed]);

    useEffect(() => {
        console.log("KKKKKKKKK   ", isShooted);
        if (isShooted) {
            setBullet({
                position: getCurrentPosition(direction, position),
                direction: direction,
                key_index: 'tank_player_Bullet_',
                is_player: true
            });
        }
    }, [isShooted]);

    const attemptMove = (dir) => {
        setRotate(directionToRotateDegree(dir));
        const newPos = getCurrentPosition(dir, position);
        
        dispatchMove(dir, 
            (obeserveBoundaries(newPos) && obeserveImpassable(newPos, tiles)? 
                newPos: position));
    }

    const obeserveImpassable = (newPos, tiles) => {
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        const nextTile = tiles[y][x];
        
        if (nextTile === 4) {
            tiles[y][x] = 0;
            setTiles(tiles);
            gameWin();
            removeTanks();
        }
        return nextTile < 5;
    };

    function dispatchMove(dir, pos) {
        const newWalkIndex = walkIndex >= 1? 0: walkIndex+1;
        
        movePlayer({
            position: pos,
            direction: dir,
            walkIndex: newWalkIndex
        });
    }

    const fireBullet = () => {
        // console.log("FFFFFF    ", isShooted, hidden);
        // isShootedPlayer(true);

        // if (currBulletCount <= 0) return;
        // setBullet({
        //     position: getCurrentPosition(player.direction, player.position),//player.position,
        //     direction: player.direction,
        //     key_index: 'tank_player_Bullet_' + currBulletCount,
        //     is_player: true
        // });
        // const shootByPlayerAudio = new Audio(shoot_by_player);
        // shootByPlayerAudio.volume = effectVolume;
        // shootByPlayerAudio.play();
    }
    
    const handleKeyDown = (e) => {
        e.preventDefault();
        // get current state
        if (!store.getState().worldReducer.game_over && 
            !store.getState().worldReducer.game_win) {
            // console.log("keydown   ", e.keyCode);
            switch (e.keyCode) {
                // case 32: case 13:
                //     return isShootedPlayer(true);//setBulletShootedCount(bulletShootedCount => bulletShootedCount+1);
                case 37: case 65:
                    return setNewDir('WEST');
                case 38: case 87:
                    return setNewDir('NORTH');
                case 39: case 68:
                    return setNewDir('EAST');
                case 40: case 83:
                    return setNewDir('SOUTH');
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
            // console.log("keyup   ", e.keyCode);
            // stopHandler();
            switch (e.keyCode) {
                case 37: case 65: case 38: case 87: case 39: case 68: case 40: case 83:
                    return setNewDir('');
                case 32: case 13:
                    return isShootedPlayer(true);
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