import {useEffect} from 'react';
import {useActions} from '../../store/hooks/useActions';

import Map from '../../components/map/map.component';
import {setupTiles} from '../../config/functions';
import {tiles} from '../../config/maps/map_1';

import './world.styles.scss';

const World = () => {
    const {setTiles} = useActions();

    useEffect(() => {
        setTiles(setupTiles(tiles));
    });

    return (
        <div className='world-container'>
            <Map />
            {/* <GameIntro /> */}
        </div>
    )
}

export default World;