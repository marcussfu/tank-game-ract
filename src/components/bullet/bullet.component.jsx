import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

import {getCurrentPosition, directionToRotateDegree, 
    obeserveBoundaries} from '../../config/functions';

import BulletPic from '../../assets/bullet/bullet.png';
import {SPRITE_SIZE, FLAG_POSITION} from '../../config/constants';
import './bullet.styles.scss';

import store from '../../store/store';

let interval = null;

const Bullet = ({bullet}) => {
    // const tiles = useSelector(state => state.mapReducer.tiles);
    const tanks = useSelector(state => state.tankReducer.tanks);
    const player = useSelector(state => state.playerReducer);

    const {setTiles, updateTiles, 
        removeTank, removeTanks,
        gameOver, gameWin, hidePlayer,
        // removeBullet,
    } = useActions();

    const [bulletStates, setBulletStates] = useState({
        ...bullet, 
        rotate: directionToRotateDegree(bullet.direction),
        is_player: bullet.is_player? true:false,
        display: true});
    
    useEffect(() => {
        interval = setInterval(() => tick(), 500);
        return () => clearInterval(interval);
    }, [bulletStates]);

    useEffect(() => {
        console.log("VVVVV  ", bulletStates.display);
        if (!bulletStates.display) clearInterval(interval);
    }, [bulletStates.display]);

    // useEffect(() => {
    //     console.log('PPPPPPPP      ', tiles);
    // }, [tiles]);

    const obeserveImpassable = (newPos) => {
        // const tiles = useSelector(state => state.mapReducer.tiles);
        const tiles = store.getState().mapReducer.tiles;
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        const nextTile = tiles[y][x]
        // hitTank(tiles, newPos, x, y);
        // hitPlayer(tiles, newPos, x, y);
        changeTiles(tiles, newPos, x, y);
        return nextTile < 5;
    };

    const hitTank = (tiles, newPos, x, y) => {
        tanks.map(tank => {
            // if (tank.position === newPos) {
            if (tank.position[0] === newPos[0] && tank.position[1] === newPos[1]) {
                console.log('hit tank', tank.key_index);
                releaseBoom(tiles, x, y);

                removeTank(tank.key_index);
                if (tanks.length <= 0)
                    gameWin();
            }
            return null;
        })
    };

    const hitPlayer = (tiles, newPos, x, y) => {
        if (bulletStates.is_player) return;
        if (player.position[0] === newPos[0] && player.position[1] === newPos[1]) {
            console.log('hit player at', newPos);
            releaseBoom(tiles, x, y);
            hidePlayer();
            gameOver();
            removeTanks();
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
                gameOver();
                removeTanks();
                break;
            case 12:
                releaseBoom(tiles, x, y);
                tiles[y][x] = 4;
                setTiles(tiles);
                console.log('find treasure at', newPos);
                break;
            default:
                break;
        }
    };

    const releaseBoom = (tiles, x, y) => {
        tiles[y][x] = 9;
        setTiles(tiles);
        
        tiles[y][x] = 0;
        setTimeout(() => {
            console.log("ZZZZZZ");
            updateTiles(tiles);
        }, 100)
    };

    const tick = () => {
        const newPos = getCurrentPosition(bulletStates.direction, bulletStates.position);
        setBulletStates(bulletStates => ({
            ...bulletStates,
            position: newPos
        }));

        if (!(obeserveBoundaries(newPos) && obeserveImpassable(newPos))) {
            setBulletStates(bulletStates => ({
                ...bulletStates,
                display: false
            }));
            console.log("KKKKKK   ", bulletStates.key_index, bulletStates.position, newPos);
            // clearInterval(interval);
        }
    };

    return (
        <div className='bullet' style={{
            top: bulletStates.position[1],
            left: bulletStates.position[0],
            display: bulletStates.display? 'block':'none',
            backgroundImage: `url(${BulletPic})`,
            transform: `rotate(${bulletStates.rotate}deg)`,
        }}/>
    )
}

export default Bullet;