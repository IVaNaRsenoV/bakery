import { FC } from 'react';
import styles from './Button.module.scss';

interface IButton {
    handler: () => void;
    dataTestid?: string;
}

export const Button: FC<IButton> = ({ handler, dataTestid }) => {
    return (
        <input data-testid={dataTestid} type="button" value="submit" onClick={handler} />
    )
}