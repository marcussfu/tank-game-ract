import {useSelector} from 'react-redux';

import MapTile from '../map-tile/map-tile.component';
import Bullets from '../bullets/bullets.component';

import {SPRITE_SIZE, getTileSprite} from '../../config/constants';

const Map = () => {
    const tiles = useSelector((state) => state.mapReducer.tiles);
    
    return (
        <div>
            {tiles.map((row,index) => 
                <div key={index} style={{height: SPRITE_SIZE}}>
                    {row.map((tile,index) => 
                        <MapTile key={index} tile={getTileSprite(tile)} />
                    )}
                </div>
            )}
            <Bullets />
        </div>
    )
}

export default Map;