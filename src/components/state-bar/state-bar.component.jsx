import { useSelector } from 'react-redux';

import Timing from '../../components/timing/timing.component';
import SettingDialog from '../../components/setting-dialog/setting-dialog.component';

import './state-bar.styles.scss';

const StateBar = () => {
    const {game_over, game_win} = useSelector(state => state.worldReducer);

    return (
        <div className='state-bar-container' style={{
            visibility: game_over || game_win? 'hidden': 'visible'
        }}>
            <Timing />
            <SettingDialog />
        </div>
    )
};

export default StateBar;