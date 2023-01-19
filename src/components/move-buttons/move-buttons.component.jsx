import './move-buttons.styles.scss';

const MoveButtons = () => {
    const handleClick = (keyCode) => {
        let event = document.createEvent('Events');
        event.initEvent('keydown', true, true);
        event.keyCode = keyCode;
        document.dispatchEvent(event);
    };

    return (
        <div className='move-buttons'>
            <div style={{
                position: 'absolute',
                marginTop: '50%',
                textAlign: 'center',
                left: 0,
                paddingLeft: '5%',
                zIndex: 1000,
                }}>
                <button onClick={(e) => handleClick(38)}>&uarr;</button>       
                <br/> 
                <button onClick={(e) => handleClick(37)}>&larr;</button>   
                &nbsp;     
                <button onClick={(e) => handleClick(39)}>&rarr;</button>        
                <br/>
                <button onClick={(e) => handleClick(40)}>&darr;</button>
            </div>
            <div style={{
                position: 'absolute',
                marginTop: '50%',
                textAlign: 'center',
                right: 0,
                paddingRight: '5%',
                zIndex: 1000,
                }}>
                <br/>
                <button onClick={(e) => handleClick(32)}>Fire</button>       
            </div>   
        </div>
    )
};

export default MoveButtons;