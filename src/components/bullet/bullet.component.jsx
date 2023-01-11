import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

import {getCurrentPosition, getChangeDirection, 
    directionToRotateDegree, obeserveBoundaries} from '../../config/functions';

import BulletPic from '../../assets/bullet/bullet.png';
import {SPRITE_SIZE} from '../../config/constants';
import './bullet.styles.scss';

const Bullet = ({bullet}) => {
    const tiles = useSelector((state) => state.mapReducer.tiles);
    const tanks = useSelector((state) => state.tankReducer.tanks);
    const {setTiles, updateTiles, removeTank} = useActions;

    const [bulletStates, setBulletStates] = useState({
        ...bullet, 
        rotate: directionToRotateDegree(bullet.direction),
        is_player: bullet.is_player? true:false,
        display: true});

    let interval = null;

    useEffect(() => {
        interval = setInterval(() => tick(), 50);
        return () => {
            clearInterval(interval)
        };
    }, [bulletStates]);

    const obeserveImpassable = (newPos, tiles) => {
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        hitTank(tiles, newPos, x, y);
        hitPlayer(tiles, newPos, x, y);
        changeTiles(tiles, newPos, x, y);
        return tiles[y][x] < 5;
    };

    const hitTank = (tiles, newPos, x, y) => {
        tanks.map(tank => {
            if (tank.position === newPos) {
                console.log('hit tank' + tank.key_index);
                releaseBoom(tiles, x, y);
            }
            removeTank(tank.key_index);
        })
    };

    const hitPlayer = (tiles, newPos, x, y) => {

    };

    const changeTiles = (tiles, newPos, x, y) => {

    };

    const releaseBoom = (tiles, x, y) => {
        tiles[y][x] = 9;
        setTiles(tiles);
        tiles[y][x] = 0;
        setTimeout(() => {
            updateTiles(tiles);
        }, 100)
    };

    const tick = () => {
        console.log("bullet tick");
        const newPos = getCurrentPosition(bulletStates.direction, bulletStates.position);
        setBulletStates(bulletStates => ({
            ...bulletStates,
            position: newPos
        }));

        if (!(obeserveBoundaries(newPos) && obeserveImpassable(newPos, tiles))) {
            setBulletStates(bulletStates => ({
                ...bulletStates,
                display: false
            }));
            clearInterval(interval);
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