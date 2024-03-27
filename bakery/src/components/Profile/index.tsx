import { FC } from 'react';
import styles from './Profile.module.scss';

export const Profile: FC = () => {
    return (
        <div>
            <h1>Profile</h1>
            <input type="button" value='info' onClick={(() => {
                console.log(localStorage.getItem("token"))
            })} />
        </div>
    )
}