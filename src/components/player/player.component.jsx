import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';
import { useState, useEffect } from 'react';

import {getCurrentPosition, obeserveBoundaries, directionToRotateDegree} from '../../config/functions';
import store from '../../store/store';
import playerTank from '../../assets/tank/playerTank.png';

import shoot_by_player from '../../assets/sounds/shoot_by_player.mp3';
import {SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH} from '../../config/constants';
import './player.styles.scss';

// const shootByPlayerAudio = new Audio(shoot_by_player);

const Player = ({player}) => {
    const {position, direction, hidden=false, spriteLocation, walkIndex} = player;
    const tiles = useSelector(state => state.mapReducer.tiles);
    const shootVolume = useSelector(state => state.settingReducer.shootVolume);
    const {setTiles, setBullet, movePlayer,
        removeTanks, gameWin} = useActions();

    const [newDir, setNewDir] = useState('');
    const [bulletShootedCount, setBulletShootedCount] = useState(0);
    const [rotate, setRotate] = useState(0);
    const [posRatio, setPosRatio] = useState({widthRatio: 1, heightRatio: 1});

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    useEffect(() => {
        setPosRatio({
            widthRatio: document.getElementsByClassName('bullets-container')[0].offsetWidth/MAP_WIDTH,
            heightRatio: document.getElementsByClassName('bullets-container')[0].offsetHeight/MAP_HEIGHT
        });

        attemptMove(newDir);
    }, [newDir]);

    useEffect(() => {
        fireBullet(bulletShootedCount);
    }, [bulletShootedCount]);

    const getSpriteLocation = (direction, walkIndex) => {
        switch(direction) {
            case 'SOUTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
            case 'EAST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
            case 'WEST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
            case 'NORTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
            default:
                return "0px 0px"
        }
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
        const newSpriteLocation = getSpriteLocation(dir, newWalkIndex);
        
        movePlayer({
            position: pos,
            direction: dir,
            spriteLocation: newSpriteLocation,
            walkIndex: newWalkIndex
        });
        console.log("player moves to " + pos)
    }

    const attemptMove = (dir) => {
        if (dir === '') return;
        setRotate(directionToRotateDegree(dir));
        const newPos = getCurrentPosition(dir, position);
        dispatchMove(dir, 
            (obeserveBoundaries(newPos) && obeserveImpassable(newPos, tiles)? 
                newPos: position));
        setNewDir('');
    }

    const fireBullet = (currBulletCount) => {
        if (currBulletCount <= 0) return;
        setBullet({
            position: position,
            direction: direction,
            key_index: 'tank_player_Bullet_' + currBulletCount,
            is_player: true
        });
        const shootByPlayerAudio = new Audio(shoot_by_player);
        shootByPlayerAudio.volume = shootVolume;
        shootByPlayerAudio.play();
    }
    
    const handleKeyDown = (e) => {
        e.preventDefault();
        // get current state
        if (!store.getState().worldReducer.game_over && 
            !store.getState().worldReducer.game_win) {
            switch (e.keyCode) {
                // case 32:
                //     return setBulletShootedCount(bulletShootedCount => bulletShootedCount+1);
                case 37: case 65:
                    return setNewDir('WEST');
                case 38: case 87:
                    return setNewDir('NORTH');
                case 39: case 68:
                    return setNewDir('EAST');
                case 40: case 83:
                    return setNewDir('SOUTH');
                default:
                    return console.log(e.keyCode);
            }
        }
    }

    const handleKeyUp = (e) => {
        e.preventDefault();
        // get current state
        if (!store.getState().worldReducer.game_over && 
            !store.getState().worldReducer.game_win) {
            switch (e.keyCode) {
                case 32: case 13:
                    return setBulletShootedCount(bulletShootedCount => bulletShootedCount+1);
                default:
                    return console.log(e.keyCode);
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