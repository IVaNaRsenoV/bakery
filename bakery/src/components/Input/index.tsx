import React, { Dispatch, SetStateAction } from 'react';
import styles from './Input.module.scss';

type SetHandlerType = Dispatch<SetStateAction<string>>;
interface IInput {
    value: string;
    tabIndex: number;
    setHandler: SetHandlerType;
}

export const Input: React.FC<IInput> = ({ value, tabIndex, setHandler }) => {

    const inputHander = (event: React.ChangeEvent<HTMLInputElement>, setHandler: SetHandlerType) => {
        event.preventDefault();
        setHandler(event.target.value);
    }

    return (
        <input
            className={styles.input}
            type="text"
            placeholder={value}
            id={value}
            required
            tabIndex={tabIndex}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHander(event, setHandler)}
        />
    )
}