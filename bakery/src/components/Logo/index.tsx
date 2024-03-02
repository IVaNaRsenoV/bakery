import { Link } from 'react-router-dom';
import bakery from 'assets/bakery.svg';
import styles from './Logo.module.scss';

export const Logo = () => {
    return (
        <div className={styles.logo}>
            <img src={bakery} alt="logo" />
            <Link to="/">
                <h1 className={styles.logoName}>Bakery</h1>
            </Link>
        </div>
    )
}