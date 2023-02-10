import {useSelector} from 'react-redux';

import click from '../../assets/sounds/click.mp3';
import './button.styles.scss';

const Button = ({children, clickFunction, ...otherProps}) => {
    const effectVolume = useSelector(state => state.settingReducer.effectVolume);
    const clickAudio = new Audio(click);

    const clickFunctionHandler = () => {
        clickAudio.volume = effectVolume;
        clickAudio.play();
        clickFunction();
    }

    return <div className='button-container' onClick={clickFunctionHandler} {...otherProps}>{children}</div>
};

export default Button;