
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

import {Joystick} from 'react-joystick-component';

import './control-panel.styles.scss';
import { Fragment } from 'react';

const ControlPanel = ({type}) => {
    const {game_over, game_win, game_start, game_pause} = useSelector(state => state.worldReducer);
    const {isShootedPlayer, setNewDir} = useActions();

    const moveKeys = {
        'LEFT': 'WEST',
        'FORWARD': 'NORTH',
        'RIGHT': 'EAST',
        'BACKWARD': 'SOUTH'
    }

    const moveHandler = (direction) => {
        setNewDir(direction);
    };

    const stopHandler = () => {
        setNewDir('');
    };

    const fireHandler = () => {
        isShootedPlayer(true);
    };

    return (
        <Fragment>
            {(game_start && !game_over && !game_win) &&
                <div className='control-panel-container'>
                    {type === 'move'? <Joystick
                        size={80}
                        baseColor="hsl(219, 84%, 56%)"
                        stickColor="hsl(219, 84%, 30%)"
                        move={(e) => moveHandler(moveKeys[e.direction])}
                        stop={stopHandler}
                    ></Joystick>
                    :
                    <div className='fire-handler' onClick={fireHandler}>
                        FIRE      
                    </div>}
                </div>
            }
        </Fragment>
    )
};

export default ControlPanel;