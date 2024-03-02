import { FC } from 'react'
import { Link } from 'react-router-dom';
import { ILinkItem, ILinksItems } from 'assets/UI/links'
import styles from './LinksItems.module.scss';

export const LinksItems: FC<ILinksItems> = ({ linkItems }) => {
    return (
        <>
            {
                linkItems.map(({ id, path, content }: ILinkItem) => {
                    return (
                        <Link key={id} to={path} className={styles.link_item}>{content}</Link>
                    )
                })
            }
        </>
    )
}