import {useSelector} from 'react-redux';
import {Joystick} from 'react-joystick-component';

import './move-buttons.styles.scss';

const MoveButtons = () => {
    const {game_over, game_win, game_start, game_pause} = useSelector(state => state.worldReducer);

    const handleClick = (keyCode) => {console.log("KKKKKK");
        let event = document.createEvent('Events');
        event.initEvent('keydown', true, true);
        event.keyCode = keyCode;
        document.dispatchEvent(event);
    };

    const handleUpClick = (keyCode) => {
        let event = document.createEvent('Events');
        event.initEvent('keyup', true, true);
        event.keyCode = keyCode;
        document.dispatchEvent(event);
    };

    const moveKeys = {
        'LEFT': 37,
        'FORWARD': 38,
        'RIGHT': 39,
        'BACKWARD': 40
    }

    const handleMove = (e) => {
        // console.log("move  ",e);
        handleClick(moveKeys[e.direction]);
    };

    const handleStop = () => {
        console.log("stop  ");
    };

    return (
        <div className='move-buttons'>
            {game_start && !game_over && !game_win? 
                <>
                    <div className='control direction'>
                        <Joystick
                            size={100}
                            baseColor="hsl(219, 84%, 56%)"
                            stickColor="hsl(219, 84%, 30%)"
                            move={handleMove}
                            stop={handleStop}
                        ></Joystick>
                    </div>
                    <div className='control fire'>
                        <div onClick={(e) => handleUpClick(32)}>Fire</div>       
                    </div> 
                </>:
                <></>
            }
        </div>
        
        // <div className='move-buttons'>
        //     <div className='control direction'>
        //         {/* <button onClick={(e) => handleClick(38)}>&uarr;</button>       
        //         <br/> 
        //         <button onClick={(e) => handleClick(37)}>&larr;</button>   
        //         &nbsp;     
        //         <button onClick={(e) => handleClick(39)}>&rarr;</button>        
        //         <br/>
        //         <button onClick={(e) => handleClick(40)}>&darr;</button> */}
        //         <Joystick
        //             size={100}
        //             baseColor="hsl(219, 84%, 56%)"
        //             stickColor="hsl(219, 84%, 30%)"
        //             move={handleMove}
        //             stop={handleStop}
        //         ></Joystick>
        //     </div>
        //     <div className='control fire'>
        //         <div onClick={(e) => handleUpClick(32)}>Fire</div>       
        //     </div>   
        // </div>
    )
};

export default MoveButtons;