// import {SPRITE_SIZE} from './constants'

export const setupTiles = (tiles) => {
    let newTiles = [...tiles]
    let treasure = getTreasureLocation()
    while(newTiles[treasure[0]][treasure[1]] !== 5) {
      treasure = getTreasureLocation()
    } 
    newTiles[treasure[0]][treasure[1]] = 12
    // console.log("setup treasure at " + [treasure[1]*SPRITE_SIZE, treasure[0]*SPRITE_SIZE])

    return newTiles
};

const getTreasureLocation = () => {
  return [Math.round(Math.random()*23), Math.round(Math.random()*39)];
};
