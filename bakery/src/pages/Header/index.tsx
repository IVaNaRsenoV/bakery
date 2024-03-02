import { Logo, Navbar } from 'components/index';
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo />
            <Navbar />
        </header>
    )
}