import styles from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
    return (
        <div className={styles.burger__menu}>
            <input type='checkbox' id={styles.menu__toggle} />
            <label htmlFor={styles.menu__toggle} className={styles.menu__btn}>
                <span></span>
            </label>
        </div>
    )
};
