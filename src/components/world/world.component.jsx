import {useEffect} from 'react';
import {useActions} from '../../store/hooks/useActions';
import {useSelector} from 'react-redux';

import Map from '../../components/map/map.component';
import Tank from "../../components/tank/tank.component";
import Player from '../../components/player/player.component';
import GameResult from '../../components/game-result/game-result.component';
import GameIntro from '../../components/game-intro/game-intro.component';
import GameStart from '../../components/game-start/game-start.component';
import MoveButtons from '../../components/move-buttons/move-buttons.component';

import {setupTiles} from '../../config/functions';
import {tiles} from '../../config/maps/map_1';

import enemyTank from '../../assets/tank/enemyTank.png';

import './world.styles.scss';

const World = () => {
    const {setTiles, setTank, addPlayer} = useActions();
    const tanks = useSelector(state => state.tankReducer.tanks);
    const player = useSelector(state => state.playerReducer);
    const {game_over, game_win, game_start} = useSelector(state => state.worldReducer);

    useEffect(() => {
        if (!game_start) return;
        setTiles(setupTiles(tiles));

        const playerState = {
            position: [280, 460],
            spriteLocation: '0px 60px',
            direction: 'NORTH',
            walkIndex: 0,
            bullets: []
        }
        addPlayer(playerState);

        setTank({
            position: [0,0],
            direction: 'SOUTH',
            key_index: Date.now()
        });

        setTank({
            position: [780,460],
            direction: 'NORTH',
            key_index: Date.now()+1
        });

        setTank({
            position: [740,0],
            direction: 'WEST',
            key_index: Date.now()+2
        });
    }, [game_start]);

    const getGameResultData = () => {
        return {
            resultText: game_over? 'Gameover':'You Win',
            game_over: game_over
        }
    };

    return (
        <div className='world-container'>
            {game_start? 
                <>
                    <MoveButtons />
                    <Map />
                    {player && <Player player={player}/>}
                    {tanks.map(tank =>
                        <Tank key={tank.key_index} tank={{...tank, imageUrl: enemyTank}} />)}
                    {(game_over || game_win) && <GameResult gameResultData={getGameResultData()} />}
                    {/* <GameIntro /> */}
                </>
                :
                <>
                    <GameStart />
                </>
            }
        </div>
    )
}

export default World;