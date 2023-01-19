import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';
import { useState, useEffect } from 'react';

import {getCurrentPosition, obeserveBoundaries} from '../../config/functions';
import playerTank from '../../assets/tank/playerTank.png';

import {SPRITE_SIZE} from '../../config/constants';
import './player.styles.scss';

const Player = ({player}) => {
    const tiles = useSelector(state => state.mapReducer.tiles);
    const {game_over, game_win} = useSelector(state => state.worldReducer);
    const {setTiles, setBullet, movePlayer, removeTanks, gameWin} = useActions();

    const [playerState, setPlayerState] = useState({
        ...player,
        hidden: player.hidden? player.hidden: false,
    });
    const [newDir, setNewDir] = useState('');
    const [bulletShootedCount, setBulletShootedCount] = useState(0);

    useEffect(() => {
        console.log("YYYYYY   ", player);
    }, [player]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, []);

    useEffect(() => {
        movePlayer({
            position: playerState.position,
            direction: playerState.direciton,
            spriteLocation: playerState.spriteLocation,
            walkIndex: playerState.walkIndex,
            // bullets: []
        });
    }, [playerState]);

    useEffect(() => {
        attemptMove(newDir);
    }, [newDir]);

    useEffect(() => {
        // console.log("HHHHHH   ", bulletShootedCount);
        fireBullet(bulletShootedCount);
    }, [bulletShootedCount])

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
        const newWalkIndex = playerState.walkIndex >= 1? 0: playerState.walkIndex+1;
        const newSpriteLocation = getSpriteLocation(dir, newWalkIndex);
        
        setPlayerState(playerState => ({
            ...playerState,
            direction: dir,
            position: pos,
            spriteLocation: newSpriteLocation,
            walkIndex: newWalkIndex,
        }));
        // console.log("player moves to " + pos)
    }

    const attemptMove = (dir) => {
        if (dir === '') return;
        const newPos = getCurrentPosition(dir, playerState.position);
        dispatchMove(dir, 
            (obeserveBoundaries(newPos) && obeserveImpassable(newPos, tiles)? 
                newPos: playerState.position));
        setNewDir('');
    }

    const fireBullet = (currBulletCount) => {
        if (currBulletCount <= 0) return;
        setBullet({
            position: playerState.position,
            direction: playerState.direction,
            key_index: 'tank_player_Bullet_' + currBulletCount,
            is_player: true
        })   
    }
    
    const handleKeyDown = (e) => {
        e.preventDefault()
        if (!game_over && !game_win) {
            switch (e.keyCode) {
                case 32:
                    return setBulletShootedCount(bulletShootedCount => bulletShootedCount+1);
                case 37:
                    return setNewDir('WEST');
                case 38:
                    return setNewDir('NORTH');
                case 39:
                    return setNewDir('EAST');
                case 40:
                    return setNewDir('SOUTH');
                default:
                    return console.log(e.keyCode);
            }
        }
    }
    
    return (
        <div>
            <div className='player' style={{
                top: playerState.position[1],
                left: playerState.position[0],
                display: playerState.hidden? 'none': 'block',
                backgroundImage: `url(${playerTank})`,
                backgroundPosition: playerState.spriteLocation
            }}/>
            <div>{playerState.position}</div>
        </div>
    )
}

export default Player;