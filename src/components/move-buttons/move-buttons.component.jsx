import './move-buttons.styles.scss';

const MoveButtons = () => {
    const handleClick = (keyCode) => {
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

    return (
        <div className='move-buttons'>
            <div className='control direction'>
                <button onClick={(e) => handleClick(38)}>&uarr;</button>       
                <br/> 
                <button onClick={(e) => handleClick(37)}>&larr;</button>   
                &nbsp;     
                <button onClick={(e) => handleClick(39)}>&rarr;</button>        
                <br/>
                <button onClick={(e) => handleClick(40)}>&darr;</button>
            </div>
            <div className='control fire'>
                <br/>
                <button onClick={(e) => handleUpClick(32)}>Fire</button>       
            </div>   
        </div>
    )
};

export default MoveButtons;