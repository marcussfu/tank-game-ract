
import {useSelector} from 'react-redux';

import './control-panel.styles.scss';
import { Fragment } from 'react';

const ControlPanel = ({children}) => {
    const {game_over, game_win, game_start, game_pause} = useSelector(state => state.worldReducer);

    return (
        <Fragment>
            {game_start && !game_over && !game_win?
                <div className='control-panel-container'>
                    {/* <Joystick
                        size={80}
                        baseColor="hsl(219, 84%, 56%)"
                        stickColor="hsl(219, 84%, 30%)"
                        move={handleMove}
                        stop={handleStop}
                    ></Joystick> */}
                    {children}
                </div>
                :
                <></>
            }
        </Fragment>
    )
};

export default ControlPanel;