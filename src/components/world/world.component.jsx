import {useEffect} from 'react';
import {useActions} from '../../store/hooks/useActions';
import {useSelector} from 'react-redux';

import Map from '../../components/map/map.component';
import Tank from "../../components/tank/tank.component";

import {setupTiles} from '../../config/functions';
import {tiles} from '../../config/maps/map_1';


import enamyTank from '../../assets/tank/enamyTank.png';
// import playerTank from '../../assets/tank/playerTank.png';

import './world.styles.scss';

const World = () => {
    const {setTiles, setTank} = useActions();
    const tanks = useSelector((state) => state.tankReducer.tanks);

    useEffect(() => {
        setTiles(setupTiles(tiles));

        // const playTankState = {
        //     position: [280, 460],
        //     spriteLocation: '0px 60px',
        //     direction: 'NORTH',
        //     walkIndex: 0,
        //     bullets: []
        // }
        // setTank(playTankState);
        setTank({
            position: [0,0],
            direction: 'SOUTH',
            key_index: Date.now()
        });

        setTank({
            position: [780,460],
            direction: 'NORTH',
            key_index: Date.now()+1
        });

        setTank({
            position: [740,0],
            direction: 'WEST',
            key_index: Date.now()+2
        });
    }, []);

    return (
        <div className='world-container'>
            <Map />
            {tanks.map(tank =>
                <Tank key={tank.key_index} tank={{...tank, imageUrl: enamyTank}} />)}
            {/* <GameIntro /> */}
        </div>
    )
}

export default World;