import { Layout } from 'routes/Layout';
import styles from './Content.module.scss';

export const Content = () => {
    return (
        <main className={styles.content}>
            <Layout />
        </main>
    )
}