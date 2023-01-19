import {SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH} from './constants'

export const setupTiles = (tiles) => {
    let newTiles = [...tiles]
    let treasure = getTreasureLocation()
    while(newTiles[treasure[0]][treasure[1]] !== 5) {
      treasure = getTreasureLocation()
    } 
    newTiles[treasure[0]][treasure[1]] = 12
    console.log("setup treasure at " + [treasure[1]*SPRITE_SIZE, treasure[0]*SPRITE_SIZE])

    return newTiles
};

const getTreasureLocation = () => {
  return [Math.round(Math.random()*23), Math.round(Math.random()*39)];
};

export const getCurrentPosition = (direction, oldPos) => {
  switch(direction) {
    case 'SOUTH':
      return [oldPos[0], oldPos[1] + SPRITE_SIZE]
    case 'EAST':
      return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
    case 'WEST':
      return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
    case 'NORTH':
      return [oldPos[0], oldPos[1] - SPRITE_SIZE]
    default:
      return [0, 0]
  }
};

export const getChangeDirection = () => {
  const random = Math.random();
  if (random < 0.25)
    return 'SOUTH'
  else if (random >= 0.25 && random < 0.5)
    return 'NORTH'
  else if (random >= 0.5 && random < 0.75)
    return 'EAST'
  else
    return 'WEST'
};

export const directionToRotateDegree = (direction) => {
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
};

export const obeserveBoundaries = (pos) => {
  return (pos[0] >= 0 && pos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
           (pos[1] >= 0 && pos[1] <= MAP_HEIGHT - SPRITE_SIZE);
};