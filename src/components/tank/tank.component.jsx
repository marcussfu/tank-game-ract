import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

import {getCurrentPosition, getChangeDirection, 
    directionToRotateDegree, obeserveBoundaries} from '../../config/functions';

import {SPRITE_SIZE} from '../../config/constants';
import './tank.styles.scss';

const Tank = ({tank}) => {
    // const {position, imageUrl, hidden=false, spriteLocation='center', rotate=0} = tank;
    const tiles = useSelector((state) => state.mapReducer.tiles);
    const {updateTank, setBullets} = useActions();

    const [tankStates, setTankStates] = useState({
        ...tank, 
        rotate: 0, 
        hidden: false,
        spriteLocation: tank.spriteLocation? tank.spriteLocation: 'center'});
    const [fireTick, setFireTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => tick(), 200);
        return () => {
            clearInterval(interval)
        };
    }, [tankStates]);

    useEffect(() => {
        // console.log("GGGGGGGG", fireTick);
        if (fireTick === 5) {
            setFireTick(0);
            // console.log("BBNNNNNNNNN  5 ", fireTick);
            setBullets({
                position: tankStates.position,
                direction: tankStates.direction
            })
        }
    }, [fireTick]);

    const obeserveImpassable = (newPos, tiles) => {
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        return tiles[y][x] < 5;
    };

    const tick = () => {
        // console.log("GGGGGGG   ", tankStates.key_index, tankStates.position, tankStates.direction);
        const newPos = getCurrentPosition(tankStates.direction, tankStates.position);
        const random = Math.random()
        if (random >= 0.9 || !(obeserveBoundaries(newPos) && obeserveImpassable(newPos, tiles))) {
            const dir = getChangeDirection();
            setTankStates(tankStates => ({
                ...tankStates,
                direction: dir,
                rotate: directionToRotateDegree(dir)
            }))
        }
        else {
            setTankStates(tankStates => ({
                ...tankStates,
                position: newPos,
                rotate: directionToRotateDegree(tankStates.direction)
            }))
            setFireTick(fireTick => fireTick+1);
        }

        updateTank({
            key_index: tankStates.key_index,
            position: tankStates.position,
            direction: tankStates.direction
        })
    };
    
    return (
        <div className='tank' style={{
            top: tankStates.position[1],
            left: tankStates.position[0],
            display: tankStates.hidden? 'none': 'block',
            backgroundImage: `url(${tankStates.imageUrl})`,
            backgroundPosition: tankStates.spriteLocation,
            transform: `rotate(${tankStates.rotate}deg)`,
        }} />
    )
};

export default Tank;