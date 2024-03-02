import { BurgerMenu, LinksItems } from 'components';
import styles from './Navbar.module.scss';
import { linkItems } from 'assets/UI/links';

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <BurgerMenu />
            <ul className={styles.navbar_menu}>
                <LinksItems linkItems={linkItems} />
            </ul>
        </nav>
    )
}