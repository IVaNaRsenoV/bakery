import styles from './BurgerMenu.module.scss';
import { useState } from 'react';
import { LinksItems } from '../index';
import { linkItems } from '../../assets/UI/links';

export const BurgerMenu = () => {

    const [open, setOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className={styles.burger__menu}>
                <input type='checkbox' id={styles.menu__toggle} onChange={toggleMenu} />
                <label htmlFor={styles.menu__toggle} className={styles.menu__btn}>
                    <span></span>
                </label>
            </div>

            {
                open && (
                    <ul className={styles.navbar_menu}>
                        <LinksItems linkItems={linkItems} />
                    </ul>
                )
            }

        </>
    )
};
