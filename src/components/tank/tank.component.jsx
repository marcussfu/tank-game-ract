import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

import {getCurrentPosition, getChangeDirection, 
    directionToRotateDegree, obeserveBoundaries, obeserveImpassable} from '../../config/functions';

import './tank.styles.scss';

const Tank = ({tank}) => {
    // const {position, imageUrl, hidden=false, spriteLocation='center', rotate=0} = tank;
    const {updateTank} = useActions();
    const tiles = useSelector((state) => state.mapReducer.tiles);

    const [tankStates, setTankStates] = useState({
        ...tank, 
        rotate: 0, 
        hidden: false,
        spriteLocation: tank.spriteLocation? tank.spriteLocation: 'center'});
    const [fireTick, setFireTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => tick(), 200);
        return () => {
            // console.log("VVVVVVV");
            clearInterval(interval)
        };
    }, [tankStates]);

    useEffect(() => {
        // console.log("TTTTTTT ", fireTick);
    }, [fireTick]);

    const tick = () => {
        // console.log('XXXXX ', fireTick);
        // setFireTick(fireTick => fireTick+1);
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
        }

        updateTank({
            key_index: tankStates.key_index,
            position: tankStates.position,
            direction: tankStates.direction
        })

        // const random = Math.random()
        // if (random >= 0.9) {
        //     const dir = getChangeDirection();
        //     setTankStates(tankStates => ({
        //         ...tankStates,
        //         direction: dir,
        //         rotate: directionToRotateDegree(dir)
        //     }))

        //     // updateTank({
        //     //     key_index: tankStates.key_index,
        //     //     position: tankStates.position,
        //     //     direction: dir
        //     // })
        // }
        // // console.log('before setting', tankStates.position);
        // // const newPos = getCurrentPosition(tankStates.direction, tankStates.position);

        // if (obeserveBoundaries(newPos) && obeserveImpassable(newPos, tiles)) {
        //     setTankStates(tankStates => ({
        //         ...tankStates,
        //         position: newPos,
        //         // rotate: directionToRotateDegree(tankStates.direction)
        //     }))

        //     // updateTank({
        //     //     key_index: tankStates.key_index,
        //     //     position: newPos,
        //     //     direction: tankStates.direction
        //     // })
        // }
        // else {
        //     const dir = getChangeDirection();
        //     setTankStates(tankStates => ({
        //         ...tankStates,
        //         direction: dir,
        //         rotate: directionToRotateDegree(dir)
        //     }))

        //     // updateTank({
        //     //     key_index: tankStates.key_index,
        //     //     position: tankStates.position,
        //     //     direction: dir
        //     // })
        // }
        // console.log("BBBBBBB  ", newPos);
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