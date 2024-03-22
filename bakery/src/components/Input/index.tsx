import React from 'react';
import styles from './Input.module.scss';
import { IInput, SetHandlerType } from './types';



export const Input: React.FC<IInput> = ({ value, tabIndex, setHandler, dataTestid }) => {

    const inputHander = (event: React.ChangeEvent<HTMLInputElement>, setHandler: SetHandlerType) => {
        event.preventDefault();
        setHandler(event.target.value);
    }

    return (
        <input
            className={styles.input}
            data-testid={dataTestid}
            type="text"
            placeholder={value}
            id={value}
            required
            tabIndex={tabIndex}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHander(event, setHandler)}
        />
    )
}