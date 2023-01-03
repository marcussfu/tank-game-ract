import {useSelector} from 'react-redux';

import MapTile from '../../components/map-tile/map-tile.component';

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
        </div>
    )
}

export default Map;