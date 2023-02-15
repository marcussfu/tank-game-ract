import {ADD_BULLET, REMOVE_BULLET, MOVE_BULLET, REMOVE_SPECIFIC_BULLET, REMOVE_UNDISPLAY_BULLET} from '../../config/types';

const intialState = {
    bullets: [
        // {position: [0,0], direction: '', key_index: '', is_player: false, display: false},
        // {position: [0,0], direction: '', key_index: '', is_player: false, display: false},
        // {position: [0,0], direction: '', key_index: '', is_player: false, display: false},
        // {position: [0,0], direction: '', key_index: '', is_player: false, display: false},
        // {position: [0,0], direction: '', key_index: '', is_player: false, display: false},
    ]
}

export const bulletsReducer = (state=intialState, action) => {
    const reuseBulletsPool = (bulletRequest) => {
        let bulletsClone = [...state.bullets];
        // let freeBulletIndex = bulletsClone.findIndex(element => !(element.display));
        // if (freeBulletIndex >= 0) {
        //     bulletsClone[freeBulletIndex] = bulletRequest;
        //     console.log("use remain bullet    ", freeBulletIndex, bulletsClone[freeBulletIndex], bulletsClone);
        // }
        // else {
            bulletsClone.push(bulletRequest);
            console.log("add new bullet    ", bulletsClone.length, bulletsClone[bulletsClone.length - 1]);
        // }
        return { bullets: bulletsClone }
    };

    const moveBullet = (bullet) => {
        let bulletsClone = [...state.bullets];
        let freeBulletIndex = bulletsClone.findIndex(element => element.key_index === bullet.key_index);

        if (freeBulletIndex >= 0) {
            bulletsClone[freeBulletIndex].position = bullet.position;
            bulletsClone[freeBulletIndex].display = bullet.display;
        }
        return { bullets: bulletsClone }
    };

    const filterOutSpeciflcBullet = (key_index) => {
        let bulletsClone = [...state.bullets];
        let filterResult = bulletsClone.filter(element => element.key_index !== key_index);
        // console.log("filter result: ", filterResult, key_index);
        return { bullets: filterResult };
    }

    const filterUndisplayBullet = () => {
        let bulletsClone = [...state.bullets];
        // const filterResult = bulletsClone.filter(element => element.display);
        const sliceReslt = bulletsClone.slice(Math.floor(bulletsClone.length/2));
        console.log("slice result: ", sliceReslt);
        return { bullets: sliceReslt };
    }

    switch(action.type) {
        case ADD_BULLET:
            // return reuseBulletsPool(action.payload);
            // return Object.assign({}, state, {
            //     bullets: [...state.bullets, action.payload]
            // })
            return {
                bullets: [...state.bullets, action.payload]
            }
        case REMOVE_BULLET:
            return intialState;
        case MOVE_BULLET:
            return moveBullet(action.payload);
        case REMOVE_SPECIFIC_BULLET:
            return filterOutSpeciflcBullet(action.payload);
        case REMOVE_UNDISPLAY_BULLET:
            return filterUndisplayBullet();
        default:
            return state
    }
}