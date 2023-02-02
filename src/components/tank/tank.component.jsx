import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

import {getCurrentPosition, getChangeDirection, 
    directionToRotateDegree, obeserveBoundaries} from '../../config/functions';

import shoot_by_tank from '../../assets/sounds/shoot_by_tank.mp3';
import {SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH} from '../../config/constants';
import './tank.styles.scss';

const Tank = ({tank}) => {
    const tiles = useSelector(state => state.mapReducer.tiles);
    const shootVolume = useSelector(state => state.settingReducer.shootVolume);
    const {updateTank, setBullet} = useActions();

    const [tankStates, setTankStates] = useState({
        ...tank, 
        rotate: 0, 
        hidden: false,
        spriteLocation: tank.spriteLocation? tank.spriteLocation: 'center',
        bulletShootedCount: 0
    });
    const [fireTick, setFireTick] = useState(0);
    // const [isRunningInterval, setIsRunningInterval] = useState(true);
    const [posRatio, setPosRatio] = useState({widthRatio: 1, heightRatio: 1});

    useEffect(() => {
        setPosRatio({
            widthRatio: document.getElementsByClassName('bullets-container')[0].offsetWidth/MAP_WIDTH,
            heightRatio: document.getElementsByClassName('bullets-container')[0].offsetHeight/MAP_HEIGHT
        });

        const interval = setInterval(() => tick(), 200);
        return () => {
            clearInterval(interval)
        };
    }, [tankStates]);

    useEffect(() => {
        if (fireTick === 5) {
            setFireTick(0);
            setTankStates(tankStates => ({
                ...tankStates,
                bulletShootedCount: tankStates.bulletShootedCount + 1
            }))
            setBullet({
                position: tankStates.position,
                direction: tankStates.direction,
                key_index: tankStates.key_index + '_Bullet_' + tankStates.bulletShootedCount
            });
            const shootByTankAudio = new Audio(shoot_by_tank);
            shootByTankAudio.volume = shootVolume;
            shootByTankAudio.play();
        }
    }, [fireTick]);

    const obeserveImpassable = (newPos, tiles) => {
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        return tiles[y][x] < 5;
    };

    const tick = () => {
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
            top: tankStates.position[1]*posRatio.heightRatio,
            left: tankStates.position[0]*posRatio.widthRatio,
            display: tankStates.hidden? 'none': 'block',
            backgroundImage: `url(${tankStates.imageUrl})`,
            backgroundPosition: tankStates.spriteLocation,
            transform: `rotate(${tankStates.rotate}deg)`,
        }} />
    )
};

export default Tank;