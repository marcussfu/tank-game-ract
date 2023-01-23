import { useActions } from '../../store/hooks/useActions';

import './game-start.styles.scss';


const GameStart = () => {
    const {gameStart} = useActions();

    return (
        <div>
            <h1>TANK WAR</h1>
            <button onClick={() => gameStart()}>START</button>
        </div>
    )
};

export default GameStart;