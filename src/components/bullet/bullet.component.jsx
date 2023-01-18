import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';


import {getCurrentPosition, directionToRotateDegree, 
    obeserveBoundaries} from '../../config/functions';

import BulletPic from '../../assets/bullet/bullet.png';
import {SPRITE_SIZE, FLAG_POSITION, MAP_WIDTH, MAP_HEIGHT} from '../../config/constants';
import './bullet.styles.scss';

import store from '../../store/store';

import React from 'react'

class Bullet extends React.Component {
    constructor(props) {
       super(props)
       this.state = {
         direction: props.bullet.direction,
         position: props.bullet.position,
         rotate: this.directionToRotateDegree(props.bullet.direction),
         display: true,
         is_player: props.bullet.is_player
       }
     }
   
     componentDidMount() {
       this.timerID = setInterval(() => this.tick(), 50)
     }
   
     componentWillUnmount() {
       clearInterval(this.timerID)
     }  
   
     tick() {
       let newPos = this.getBulletPosition(this.state.direction, this.state.position, 5)
       this.setState({
         position: newPos
       })
   
       if (!(this.obeserveBoundaries(newPos) && this.obeserveImpassable(newPos))) {
            this.setState({
                display: false
            })      
            clearInterval(this.timerID)      
       }
     }
   
     obeserveBoundaries(newPos) {
       return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
              (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE) 
     }
   
     obeserveImpassable(newPos) {
       const tiles = store.getState().mapReducer.tiles
       const y = newPos[1] / SPRITE_SIZE
       const x = newPos[0] / SPRITE_SIZE
       const nextTile = tiles[y][x]
    //    this.hitTank(tiles, newPos, x, y)    
    //    this.hitPlayer(tiles, newPos, x, y)
       this.updateTiles(tiles, newPos, x, y)
       return nextTile < 5
     }
   
     releaseBoom(tiles, x, y) {
       tiles[y][x] = 9
       store.dispatch({
         type: 'ADD_TILES',
         payload: tiles,
        //  payload: {
        //    tiles: tiles,
        //    bullets: []
        //  }
       })
       setTimeout(() => {
        tiles[y][x] = 0
             store.dispatch({
             type: 'UPDATE_TILES',
             payload: tiles,
        //      payload: {
        //      tiles: tiles,
        //      bullets: []
           })
       }, 100)


    //    tiles[y][x] = 0
    //    setTimeout(() => {
    //      store.dispatch({
    //          type: 'UPDATE_TILES',
    //          payload: tiles,
    //     //      payload: {
    //     //      tiles: tiles,
    //     //      bullets: []
    //     //    }
    //      })
    //    }, 100)
     }
   
     hitTank(tiles, newPos, x, y) {
       const tanks = store.getState().tankReducer.tanks
       tanks.map((tank, index) => {
         if(tank.position[0] === newPos[0] && tank.position[1] === newPos[1]){
           console.log("hint tank " + index)
           this.releaseBoom(tiles, x, y)
           store.dispatch({
             type: 'REMOVE_TANK',
             index: index
           })
   
           if (store.getState().tankReducer.tanks && store.getState().tankReducer.tanks.length === 0) {
             store.dispatch({
               type: 'GAME_WIN'
             })
           }
         }
         return null
       })
     }
   
     hitPlayer(tiles, newPos, x, y) {
       if (this.state.is_player !== true){  
         const player = store.getState().playerReducer
         if(player.position[0] === newPos[0] && player.position[1] === newPos[1]){
           console.log("hint player at " + newPos)
           this.releaseBoom(tiles, x, y)
           store.dispatch({
             type: 'HIDE_PLAYER'
           })
           store.dispatch({
             type: 'GAMEOVER'
           })  
           store.dispatch({
             type: 'REMOVE_TANKS'
           })               
         }
       }
     }  
   
     updateTiles(tiles, newPos, x, y) {
       const nextTile = tiles[y][x]
       switch(Math.round(nextTile)) {      
         case 5:
           this.releaseBoom(tiles, x, y)
           break  
   
         case 10:
           FLAG_POSITION.map((row, index) => tiles[row[0]][row[1]] = 11 + 0.1*(index+1))
           store.dispatch({
             type: 'ADD_TILES',
             payload: tiles,
            //  payload: {
            //    tiles: tiles,
            //    bullets: []
            //  }
           }) 
           store.dispatch({
             type: 'GAMEOVER'
           })    
           store.dispatch({
             type: 'REMOVE_TANKS'
           })                               
           break    
   
         case 12:
           this.releaseBoom(tiles, x, y)
           tiles[y][x] = 4
           store.dispatch({
             type: 'ADD_TILES',
             payload: tiles,
            //  payload: {
            //    tiles: tiles,
            //    bullets: []
            //  }
           }) 
           console.log("find tresure at " + newPos)
           break        
   
         default:
           break
       }
     }
   
     getBulletPosition(direction, oldPos) {
       switch(direction) {
         case 'SOUTH':
           return [oldPos[0], oldPos[1] + 20]
         case 'EAST':
           return [oldPos[0] + 20, oldPos[1]]
         case 'WEST':
           return [oldPos[0] - 20, oldPos[1]]
         case 'NORTH':
           return [oldPos[0], oldPos[1] - 20]
         default:
           return [0, 0]
       }
     }  
   
     directionToRotateDegree(direction) {
       switch(direction) {
         case 'SOUTH':
           return 180
         case 'EAST':
           return 90
         case 'WEST':
           return 270
         case 'NORTH':
           return 0
         default:
           return 0
       }
     }
   
     render() {
       return(
         <div 
           style={{
             top: this.state.position[1],
             left: this.state.position[0],
             backgroundImage: `url(${BulletPic})`,
             width: '20px',
             height: '20px',
             position: 'absolute',
             backgroundPosition: "0px 0px",
             display: this.state.display === false ? "none" : "block",
             transform: `rotate(${this.state.rotate}deg)`
           }}
         />
      )  
     }
   }

// let interval = null;

// const Bullet = ({bullet}) => {
//     // const tiles = useSelector(state => state.mapReducer.tiles);
//     const tanks = useSelector(state => state.tankReducer.tanks);
//     const player = useSelector(state => state.playerReducer);

//     const {setTiles, updateTiles, 
//         removeTank, removeTanks,
//         gameOver, gameWin, hidePlayer,
//         // removeBullet,
//     } = useActions();

//     const [bulletStates, setBulletStates] = useState({
//         ...bullet, 
//         rotate: directionToRotateDegree(bullet.direction),
//         is_player: bullet.is_player? true:false,
//         display: true});
    
//     useEffect(() => {
//         interval = setInterval(() => tick(), 500);
//         return () => clearInterval(interval);
//     }, [bulletStates]);

//     useEffect(() => {
//         console.log("VVVVV  ", bulletStates.display);
//         if (!bulletStates.display) clearInterval(interval);
//     }, [bulletStates.display]);

//     // useEffect(() => {
//     //     console.log('PPPPPPPP      ', tiles);
//     // }, [tiles]);

//     const obeserveImpassable = (newPos) => {
//         // const tiles = useSelector(state => state.mapReducer.tiles);
//         const tiles = store.getState().mapReducer.tiles;
//         const y = newPos[1] / SPRITE_SIZE;
//         const x = newPos[0] / SPRITE_SIZE;
//         const nextTile = tiles[y][x]
//         // hitTank(tiles, newPos, x, y);
//         // hitPlayer(tiles, newPos, x, y);
//         changeTiles(tiles, newPos, x, y);
//         return nextTile < 5;
//     };

//     const hitTank = (tiles, newPos, x, y) => {
//         tanks.map(tank => {
//             // if (tank.position === newPos) {
//             if (tank.position[0] === newPos[0] && tank.position[1] === newPos[1]) {
//                 console.log('hit tank', tank.key_index);
//                 releaseBoom(tiles, x, y);

//                 removeTank(tank.key_index);
//                 if (tanks.length <= 0)
//                     gameWin();
//             }
//             return null;
//         })
//     };

//     const hitPlayer = (tiles, newPos, x, y) => {
//         if (bulletStates.is_player) return;
//         if (player.position[0] === newPos[0] && player.position[1] === newPos[1]) {
//             console.log('hit player at', newPos);
//             releaseBoom(tiles, x, y);
//             hidePlayer();
//             gameOver();
//             removeTanks();
//         }
//     };

//     const changeTiles = (tiles, newPos, x, y) => {
//         const nextTile = tiles[y][x];
//         switch(Math.round(nextTile)) {
//             case 5:
//                 releaseBoom(tiles, x, y);
//                 break;
//             case 10:
//                 FLAG_POSITION.map((row, index) => 
//                     tiles[row[0]][row[1]] = 11 + 0.1*(index+1))
//                 setTiles(tiles);
//                 gameOver();
//                 removeTanks();
//                 break;
//             case 12:
//                 releaseBoom(tiles, x, y);
//                 tiles[y][x] = 4;
//                 setTiles(tiles);
//                 console.log('find treasure at', newPos);
//                 break;
//             default:
//                 break;
//         }
//     };

//     const releaseBoom = (tiles, x, y) => {
//         tiles[y][x] = 9;
//         setTiles(tiles);
        
//         tiles[y][x] = 0;
//         setTimeout(() => {
//             console.log("ZZZZZZ");
//             updateTiles(tiles);
//         }, 100)
//     };

//     const tick = () => {
//         const newPos = getCurrentPosition(bulletStates.direction, bulletStates.position);
//         setBulletStates(bulletStates => ({
//             ...bulletStates,
//             position: newPos
//         }));

//         if (!(obeserveBoundaries(newPos) && obeserveImpassable(newPos))) {
//             setBulletStates(bulletStates => ({
//                 ...bulletStates,
//                 display: false
//             }));
//             console.log("KKKKKK   ", bulletStates.key_index, bulletStates.position, newPos);
//             // clearInterval(interval);
//         }
//     };

//     return (
//         <div className='bullet' style={{
//             top: bulletStates.position[1],
//             left: bulletStates.position[0],
//             display: bulletStates.display? 'block':'none',
//             backgroundImage: `url(${BulletPic})`,
//             transform: `rotate(${bulletStates.rotate}deg)`,
//         }}/>
//     )
// }

export default Bullet;