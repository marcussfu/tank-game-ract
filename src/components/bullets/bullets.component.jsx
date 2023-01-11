import {useSelector} from 'react-redux';

import Bullet from '../bullet/bullet.component';

import './bullets.styles.scss';

const Bullets = () => {
    const bullets = useSelector(state => state.bulletsReducer.bullets);
    return (
        <div className='bullets-container'>
            {
                bullets.map((bullet, index) =>
                    <Bullet key={index} bullet={bullet} />
                )
            }
        </div>
    )
}

export default Bullets;