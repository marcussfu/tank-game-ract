import {useEffect, useState} from 'react';
import {useActions} from '../../store/hooks/useActions';
import {useSelector} from 'react-redux';

import Map from '../../components/map/map.component';
import Tank from "../../components/tank/tank.component";
import Player from '../../components/player/player.component';
import GameResult from '../../components/game-result/game-result.component';
// import GameIntro from '../../components/game-intro/game-intro.component';
import GameStart from '../../components/game-start/game-start.component';
// import MoveButtons from '../../components/move-buttons/move-buttons.component';
import StateBar from '../../components/state-bar/state-bar.component';

import ControlPanel from '../../components/control-panel/control-panel.component';
import {Joystick} from 'react-joystick-component';

import {setupTiles} from '../../config/functions';
import {tiles} from '../../config/maps/map_1';

import bgm from '../../assets/sounds/bgm.mp3';
import shoot_by_player from '../../assets/sounds/shoot_by_player.mp3';
import short_of_time_bgm from '../../assets/sounds/short_of_time_bgm.mp3';
import game_over_bgm from '../../assets/sounds/game_over_bgm.mp3';
import game_win_bgm from '../../assets/sounds/game_win_bgm.mp3';

import enemyTank from '../../assets/tank/enemyTank.png';

import {SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH} from '../../config/constants';
import {getCurrentPosition, obeserveBoundaries, directionToRotateDegree} from '../../config/functions';

import './world.styles.scss';

const World = () => {
    const {setTiles, setTank, addPlayer, gamePause, setBullet, movePlayer,
        removeTanks, gameWin} = useActions();
    const tanks = useSelector(state => state.tankReducer.tanks);
    const player = useSelector(state => state.playerReducer);
    const {game_over, game_win, game_start, short_of_time, game_pause} = useSelector(state => state.worldReducer);
    const bgVolume = useSelector(state => state.settingReducer.bgVolume);

    const currTiles = useSelector(state => state.mapReducer.tiles);
    const shootVolume = useSelector(state => state.settingReducer.shootVolume);

    // const bgmAudio = new Audio(bgm);
    const gameOverAudio = new Audio(game_over_bgm);
    const gameWinAudio = new Audio(game_win_bgm);

    const [bgmAudio, setBgmAudio] = useState(new Audio(bgm));

    const moveKeys = {
        'LEFT': 'WEST',
        'FORWARD': 'NORTH',
        'RIGHT': 'EAST',
        'BACKWARD': 'SOUTH'
    }

    const [newDir, setNewDir] = useState('');
    const [bulletShootedCount, setBulletShootedCount] = useState(0);
    const [rotate, setRotate] = useState(0);
    const [posRatio, setPosRatio] = useState({widthRatio: 1, heightRatio: 1});

    let player_move_interval = null;

    useEffect(() => {
        fireBullet(bulletShootedCount);
    }, [bulletShootedCount]);

    useEffect(() => {
        setPosRatio({
            widthRatio: document.getElementsByClassName('playground-container')[0].offsetWidth/MAP_WIDTH,
            heightRatio: document.getElementsByClassName('playground-container')[0].offsetHeight/MAP_HEIGHT
        });
        
        if (!player_move_interval) {
            player_move_interval = setInterval(() => {
                if (newDir == '') return;
                attemptMove(newDir);
            }, 200);
        }
        else if (player_move_interval && newDir == '') {
            clearInterval(player_move_interval);
        }
        return () => clearInterval(player_move_interval);
    }, [newDir, player]);

    useEffect(() => {
        bgmAudio.volume = bgVolume;
        // setBgmAudio(bgmAudio => bgmAudio.volume = bgVolume);
    }, [bgVolume]);

    useEffect(() => {
        if (short_of_time) {
            bgmAudio.src = short_of_time_bgm;
            bgmAudio.load();
            bgmAudio.play();
            // setBgmAudio(bgmAudio => {
            //     bgmAudio.src = short_of_time_bgm;
            //     bgmAudio.load();
            //     bgmAudio.play();
            // });
        }
    }, [short_of_time]);

    useEffect(() => {
        if (!game_start)
            bgmAudioInit();
        else {
            bgmAudio.src = bgm;
            bgmAudio.load();
            bgmAudio.play();
            bgmAudio.loop = true;
            // setBgmAudio(bgmAudio => {
            //     bgmAudio.src = bgm;
            //     bgmAudio.load();
            //     bgmAudio.play();
            //     bgmAudio.loop = true;
            // });

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
        }
    }, [game_start]);

    useEffect(() => {
        if (game_over || game_win) {
            bgmAudioInit();
            game_over && gameOverAudio.play();
            game_win && gameWinAudio.play();
        }
        else {
            gameWinAudio.pause();
            gameWinAudio.currentTime = 0;

            gameOverAudio.pause();
            gameOverAudio.currentTime = 0;
        }
            
    }, [game_over, game_win]);

    // const orientationChange = (e) => {
    //     // setOrientationType(e.currentTarget.type);
    //     // setOrientationType(Math.abs(window.orientation) == 0? 'portrait':'landscape')
    //     setOrientationType(e.matches? 'portrait':'landscape');
    // }

    const bgmAudioInit = () => {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
    };

    const getGameResultData = () => {
        return {
            resultText: game_over? 'Gameover':'You Win',
            game_over: game_over
        }
    };

    const obeserveImpassable = (newPos, tiles) => {
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        const nextTile = tiles[y][x];
        
        if (nextTile === 4) {
            tiles[y][x] = 0;
            setTiles(tiles);
            gameWin();
            removeTanks();
        }
        return nextTile < 5;
    };

    function dispatchMove(dir, pos) {
        const newWalkIndex = player.walkIndex >= 1? 0: player.walkIndex+1;
        const newSpriteLocation = getSpriteLocation(dir, newWalkIndex);
        
        movePlayer({
            position: pos,
            direction: dir,
            spriteLocation: newSpriteLocation,
            walkIndex: newWalkIndex
        });
        // console.log("player moves to " + pos)
    }

    const getSpriteLocation = (direction, walkIndex) => {
        switch(direction) {
            case 'SOUTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
            case 'EAST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
            case 'WEST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
            case 'NORTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
            default:
                return "0px 0px"
        }
    }
    
    const moveHandler = (direction) => {
        console.log("move  ", direction);
        setNewDir(direction);
    };

    const stopHandler = () => {
        console.log("stop  ");
        setNewDir('');
    };

    const fireHandler = () => {
        console.log("fire");
        setBulletShootedCount(bulletShootedCount => bulletShootedCount+1);
    };

    const attemptMove = (dir) => {
        // if (dir === '') return;
        setRotate(directionToRotateDegree(dir));
        const newPos = getCurrentPosition(dir, player.position);
        console.log("attemptMove    ", player.position, newPos);
        
        dispatchMove(dir, 
            (obeserveBoundaries(newPos) && obeserveImpassable(newPos, currTiles)? 
                newPos: player.position));
        
        // setNewDir('');
    }

    const fireBullet = (currBulletCount) => {
        if (currBulletCount <= 0) return;
        setBullet({
            position: getCurrentPosition(player.direction, player.position),//player.position,
            direction: player.direction,
            key_index: 'tank_player_Bullet_' + currBulletCount,
            is_player: true
        });
        const shootByPlayerAudio = new Audio(shoot_by_player);
        shootByPlayerAudio.volume = shootVolume;
        shootByPlayerAudio.play();
    }

    return (
        <div className='world-container'>
            {/* <MoveButtons /> */}
            <ControlPanel>
                <Joystick
                    size={80}
                    baseColor="hsl(219, 84%, 56%)"
                    stickColor="hsl(219, 84%, 30%)"
                    move={(e) => moveHandler(moveKeys[e.direction])}
                    stop={stopHandler}
                ></Joystick>
            </ControlPanel>
            <div className='playground-container'>
                {game_start? 
                    <>
                        <Map />
                        {(!game_pause && player.position.length > 0) && 
                            <Player player={{...player, rotate:rotate, posRatio:posRatio}} 
                                fireHandler={fireHandler} attemptMove={attemptMove} moveHandler={moveHandler} stopHandler={stopHandler}/>}
                        {!game_pause && tanks.map(tank =>
                            <Tank key={tank.key_index} tank={{...tank, imageUrl: enemyTank}} />)}
                        {(game_over || game_win) && <GameResult gameResultData={getGameResultData()} />}
                        <StateBar />
                        {/* <GameIntro /> */}
                    </>
                    :
                    <>
                        <GameStart />
                    </>
                }
            </div>
            <ControlPanel>
                <div className='fire-handler' onClick={() => fireHandler()}>
                    FIRE      
                </div>
            </ControlPanel>
        </div>
    )
}

export default World;