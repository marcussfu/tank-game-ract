import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

// import React from 'react'
import {getCurrentPosition, directionToRotateDegree, 
    obeserveBoundaries} from '../../config/functions';
    import store from '../../store/store';

import {SPRITE_SIZE, FLAG_POSITION} from '../../config/constants';
import BulletPic from '../../assets/bullet/bullet.png';
import './bullet.styles.scss';

const Bullet = ({bullet}) => {
    const tiles = useSelector(state => state.mapReducer.tiles);
    const tanks = useSelector(state => state.tankReducer.tanks);
    const player = useSelector(state => state.playerReducer);

    const {setTiles, updateTiles, 
        removeTank, removeTanks,
        gameOver, gameWin, hidePlayer,
        // removeBullet,
    } = useActions();

    const [bulletStates, setBulletStates] = useState({
        ...bullet, 
        rotate: directionToRotateDegree(bullet.direction),
        is_player: bullet.is_player? true:false,
        display: true});

    const [isRunningInterval, setIsRunningInterval] = useState(true);

    let interval = null;
    
    useEffect(() => {
        if (isRunningInterval)
            interval = setInterval(() => tick(), 50);
        else {
            setBulletStates(bulletStates => ({
                ...bulletStates,
                display: false
            }));
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunningInterval]);

    useEffect(() => {
        if (!(obeserveBoundaries(bulletStates.position) && obeserveImpassable(bulletStates.position)))
            setIsRunningInterval(false);
    }, [bulletStates]);

    const tick = () => {
        setBulletStates(bulletStates => ({
            ...bulletStates,
            position: getCurrentPosition(bulletStates.direction, bulletStates.position)
        }));
    };

    const obeserveImpassable = (newPos) => {
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        const nextTile = tiles[y][x]
        hitTank(tiles, newPos, x, y);
        hitPlayer(tiles, newPos, x, y);
        changeTiles(tiles, newPos, x, y);
        return nextTile < 5;
    };

    const hitTank = (tiles, newPos, x, y) => {
        if (!tanks) return;
        tanks.forEach(tank => {
            if (JSON.stringify(tank.position) === JSON.stringify(newPos)) {
                console.log('hit tank', tank.key_index);
                releaseBoom(tiles, x, y);

                removeTank(tank.key_index);
                // get current tanks state
                if (store.getState().tankReducer.tanks.length <= 0)
                    gameWin();
            }
        })
    };

    const hitPlayer = (tiles, newPos, x, y) => {
        if (bulletStates.is_player) return;
        if (JSON.stringify(player.position) === JSON.stringify(newPos)) {
            console.log('hit player at', newPos);
            releaseBoom(tiles, x, y);
            hidePlayer();
            gameOver();
            removeTanks();
        }
    };

    const changeTiles = (tiles, newPos, x, y) => {
        const nextTile = tiles[y][x];
        switch(Math.round(nextTile)) {
            case 5:
                releaseBoom(tiles, x, y);
                break;
            case 10:
                FLAG_POSITION.map((row, index) => 
                    tiles[row[0]][row[1]] = 11 + 0.1*(index+1))
                setTiles(tiles);
                gameOver();
                removeTanks();
                break;
            case 12:
                releaseBoom(tiles, x, y);
                setTimeout(() => {
                    tiles[y][x] = 4;
                    setTiles(tiles);
                }, 100);
                console.log('find treasure at', newPos);
                break;
            default:
                break;
        }
    };

    const releaseBoom = (tiles, x, y) => {
        tiles[y][x] = 9;
        setTiles(tiles);

        setTimeout(() => {
            tiles[y][x] = 0;
            updateTiles(tiles);
        }, 100)
    };

    return (
        <div className='bullet' style={{
            top: bulletStates.position[1],
            left: bulletStates.position[0],
            display: bulletStates.display? 'block':'none',
            backgroundImage: `url(${BulletPic})`,
            transform: `rotate(${bulletStates.rotate}deg)`,
        }}/>
    )
}

// class Bullet extends React.Component {
//     constructor(props) {
//        super(props)
//        this.state = {
//          direction: props.bullet.direction,
//          position: props.bullet.position,
//          rotate: directionToRotateDegree(props.bullet.direction),
//          display: true,
//          is_player: props.bullet.is_player
//        }
//      }
   
//     componentDidMount() {
//        this.timerID = setInterval(() => this.tick(), 50)
//     }
   
//     componentWillUnmount() {
//        clearInterval(this.timerID)
//     }  
   
//     tick() {
//        let newPos = getCurrentPosition(this.state.direction, this.state.position, 5)
//        this.setState({
//          position: newPos
//        })
   
//        if (!(obeserveBoundaries(newPos) && this.obeserveImpassable(newPos))) {
//             this.setState({
//                 display: false
//             })      
//             clearInterval(this.timerID)      
//        }
//     }
   
//     obeserveImpassable(newPos) {
//        const tiles = store.getState().mapReducer.tiles
//        const y = newPos[1] / SPRITE_SIZE
//        const x = newPos[0] / SPRITE_SIZE
//        const nextTile = tiles[y][x]
//        this.hitTank(tiles, newPos, x, y)    
//        this.hitPlayer(tiles, newPos, x, y)
//        this.updateTiles(tiles, newPos, x, y)
//        return nextTile < 5
//     }
   
//     releaseBoom(tiles, x, y) {
//        tiles[y][x] = 9
//        store.dispatch({
//             type: 'ADD_TILES',
//             payload: tiles
//        })
//        setTimeout(() => {
//             tiles[y][x] = 0
//             store.dispatch({
//                 type: 'UPDATE_TILES',
//                 payload: tiles
//             })
//        }, 100)
//     }
   
//     hitTank(tiles, newPos, x, y) {
//         const tanks = store.getState().tankReducer.tanks;
//         if (!tanks) return;
//         tanks.forEach(tank => {
//             if (JSON.stringify(tank.position) === JSON.stringify(newPos)) {
//                 console.log("hint tank " + tank.key_index)
//                 this.releaseBoom(tiles, x, y);
//                 store.dispatch({
//                     type: 'REMOVE_TANK',
//                     payload: tank.key_index
//                 })
//                 // get current tanks state
//                 if (store.getState().tankReducer.tanks.length === 0) {
//                     store.dispatch({
//                         type: 'GAME_WIN'
//                     })
//                 }
//             }
//         })
//     }
   
//     hitPlayer(tiles, newPos, x, y) {
//         if (this.state.is_player) return;
//         const player = store.getState().playerReducer;
//         if (JSON.stringify(player.position) === JSON.stringify(newPos)) {
//             console.log("hint player at " + newPos)
//             this.releaseBoom(tiles, x, y)
//             store.dispatch({
//                 type: 'HIDE_PLAYER'
//             })
//             store.dispatch({
//                 type: 'GAME_OVER'
//             })  
//             store.dispatch({
//                 type: 'REMOVE_TANKS'
//             })               
//         }
//     }  
   
//     updateTiles(tiles, newPos, x, y) {
//         const nextTile = tiles[y][x]
//         switch(Math.round(nextTile)) {      
//             case 5:
//                 this.releaseBoom(tiles, x, y)
//                 break
//             case 10:
//                 FLAG_POSITION.map((row, index) => tiles[row[0]][row[1]] = 11 + 0.1*(index+1))
//                 store.dispatch({
//                     type: 'ADD_TILES',
//                     payload: tiles
//                 }) 
//                 store.dispatch({
//                     type: 'GAME_OVER'
//                 })    
//                 store.dispatch({
//                     type: 'REMOVE_TANKS'
//                 })                               
//                 break
//             case 12:
//                 this.releaseBoom(tiles, x, y);
//                 setTimeout(() => {
//                     tiles[y][x] = 4
//                     store.dispatch({
//                         type: 'ADD_TILES',
//                         payload: tiles
//                     })
//                 }, 100);
//                 console.log("find tresure at " + newPos)
//                 break
//             default:
//                 break
//         }
//     }
   
//     render() {
//         return(
//             <div style={{
//                 top: this.state.position[1],
//                 left: this.state.position[0],
//                 backgroundImage: `url(${BulletPic})`,
//                 width: '20px',
//                 height: '20px',
//                 position: 'absolute',
//                 backgroundPosition: "0px 0px",
//                 display: this.state.display === false ? "none" : "block",
//                 transform: `rotate(${this.state.rotate}deg)`
//             }}/>
//         )
//     }
// }

export default Bullet;