import {useState, useEffect} from 'react';

import './tank.styles.scss';

const Tank = ({tank}) => {
    // const {position, imageUrl, hidden=false, spriteLocation='center', rotate=0} = tank;

    const [tankStates, setTankStates] = useState({
        ...tank, 
        rotate: 0, 
        hidden: false,
        spriteLocation: tank.spriteLocation? tank.spriteLocation: 'center'});
    const [fireTick, setFireTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => tick(), 200);
        return () => clearInterval(interval);
    }, []);

    const tick = () => {
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