import { FC } from 'react'
import { Link } from 'react-router-dom';
import { ILinkItem, ILinksItems } from '../../assets/UI/links'
import { useAppSelector } from '../../store/reduxHelpers';
import styles from './LinksItems.module.scss';

export const LinksItems: FC<ILinksItems> = ({ linkItems }) => {

    const auth = useAppSelector((state) => state.auth.auth);

    return (
        <>
            {
                linkItems.map(({ id, path, content }: ILinkItem) => {
                    if (auth && path === '/login') return null;
                    if (!auth && path === '/logout') return null;
                    if (!auth && path === '/profile') return null;

                    return (
                        <Link key={id} to={path} className={styles.link_item}>{content}</Link>
                    )
                })
            }
        </>
    )
}