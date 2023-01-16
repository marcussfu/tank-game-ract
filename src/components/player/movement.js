// import {useSelector} from 'react-redux';
// import {useActions} from '../../store/hooks/useActions';

const handleMovement = (player) => {
    const gameOver = player.useSelector(state => state.worldReducer.gameOver);
    const gameWin = player.useSelector(state => state.worldReducer.gameWin);

    const handleKeyDown = (e) => {
        e.preventDefault()
        if (!gameOver && !gameWin) {
            // switch (e.keyCode) {
            //     case 32:
            //         return fireBullet()
            //     case 37:
            //         return attemptMove('WEST')
            //     case 38:
            //         return attemptMove('NORTH')
            //     case 39:
            //         return attemptMove('EAST')
            //     case 40:
            //         return attemptMove('SOUTH')
            //     default:
            //         return console.log(e.keyCode)
            // }
        }
    }
    
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player;
}

export default handleMovement;