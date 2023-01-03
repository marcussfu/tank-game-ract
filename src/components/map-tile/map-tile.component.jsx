import {SPRITE_SIZE} from '../../config/constants';

import './map-tile.styles.scss';

const MapTile = ({tile}) => {
    return (
        <div className={`tile ${tile}`}
            style={{
                height: SPRITE_SIZE,
                width: SPRITE_SIZE
            }} />
    )
}

export default MapTile;