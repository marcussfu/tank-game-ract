import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

// import React from 'react'
import {getCurrentPosition, directionToRotateDegree, 
    obeserveBoundaries} from '../../config/functions';
import store from '../../store/store';

import {SPRITE_SIZE, FLAG_POSITION, MAP_HEIGHT, MAP_WIDTH} from '../../config/constants';
import BulletPic from '../../assets/bullet/bullet.png';

// import find_star from '../../assets/sounds/find_star.mp3';
import crash from '../../assets/sounds/crash.mp3';
import './bullet.styles.scss';

const Bullet = ({bullet}) => {
    const tiles = useSelector(state => state.mapReducer.tiles);
    const tanks = useSelector(state => state.tankReducer.tanks);
    const player = useSelector(state => state.playerReducer);

    const {setTiles, updateTiles, 
        removeTank, removeTanks,
        gameOver, gameWin, hidePlayer,
        removeBullet,
    } = useActions();

    const [bulletStates, setBulletStates] = useState({
        ...bullet, 
        rotate: directionToRotateDegree(bullet.direction),
        is_player: bullet.is_player? true:false,
        display: false});

    const [isRunningInterval, setIsRunningInterval] = useState(true);
    const [posRatio, setPosRatio] = useState({widthRatio: 1, heightRatio: 1});
    let interval = null;
    
    useEffect(() => {
        if (isRunningInterval)
            interval = setInterval(() => tick(), 50);
        else 
            clearInterval(interval);

        setBulletStates(bulletStates => ({
            ...bulletStates,
            display: isRunningInterval
        }));
        return () => clearInterval(interval);
    }, [isRunningInterval]);

    useEffect(() => {
        setPosRatio({
            widthRatio: document.getElementsByClassName('bullets-container')[0].offsetWidth/MAP_WIDTH,
            heightRatio: document.getElementsByClassName('bullets-container')[0].offsetHeight/MAP_HEIGHT
        });

        if (!(obeserveBoundaries(bulletStates.position) && obeserveImpassable(bulletStates.position)))
            setIsRunningInterval(false);
    }, [bulletStates]);

    const tick = () => {
        setBulletStates(bulletStates => ({
            ...bulletStates,
            position: getCurrentPosition(bulletStates.direction, bulletStates.position)
        }));
    };

    const gameOverTotal = () => {
        gameOver();
        removeTanks();
        removeBullet();
    };

    const obeserveImpassable = (newPos) => {
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        const nextTile = tiles[y][x]
        hitTank(tiles, newPos, x, y);
        hitPlayer(tiles, newPos, x, y);
        changeTiles(tiles, newPos, x, y);
        return nextTile < 5;
    };

    const hitTank = (tiles, newPos, x, y) => {
        if (!tanks) return;
        tanks.forEach(tank => {
            if (JSON.stringify(tank.position) === JSON.stringify(newPos)) {
                console.log('hit tank', tank.key_index);
                releaseBoom(tiles, x, y);

                removeTank(tank.key_index);
                // get current tanks state
                if (store.getState().tankReducer.tanks.length <= 0) {
                    gameWin();
                    removeBullet();
                }
            }
        })
    };

    const hitPlayer = (tiles, newPos, x, y) => {
        if (bulletStates.is_player) return;
        if (JSON.stringify(player.position) === JSON.stringify(newPos)) {
            console.log('hit player at', newPos);
            releaseBoom(tiles, x, y);
            hidePlayer();
            gameOverTotal();
        }
    };

    const changeTiles = (tiles, newPos, x, y) => {
        const nextTile = tiles[y][x];
        switch(Math.round(nextTile)) {
            case 5:
                releaseBoom(tiles, x, y);
                break;
            case 10:
                FLAG_POSITION.map((row, index) => 
                    tiles[row[0]][row[1]] = 11 + 0.1*(index+1))
                setTiles(tiles);
                gameOverTotal();
                break;
            case 12:
                releaseBoom(tiles, x, y);
                // const findStarAudio = new Audio(find_star);
                // findStarAudio.play();

                setTimeout(() => {
                    tiles[y][x] = 4;
                    setTiles(tiles);
                }, 100);
                console.log('find treasure at', newPos);
                break;
            default:
                break;
        }
    };

    const releaseBoom = (tiles, x, y) => {
        const crashAudio = new Audio(crash);
        crashAudio.play();

        const forest = tiles[y][x] === 1? true: false;
        tiles[y][x] = 9;
        setTiles(tiles);

        setTimeout(() => {
            tiles[y][x] = forest? 1:0;
            updateTiles(tiles);
        }, 100)
    };

    return (
        <div className='bullet' style={{
            top: bulletStates.position[1]*posRatio.heightRatio,
            left: bulletStates.position[0]*posRatio.widthRatio,
            display: bulletStates.display? 'block':'none',
            backgroundImage: `url(${BulletPic})`,
            transform: `rotate(${bulletStates.rotate}deg)`,
        }}/>
    )
}

export default Bullet;