import { Dispatch, SetStateAction } from 'react';

export type SetHandlerType = Dispatch<SetStateAction<string>>;
export interface IInput {
    value: string;
    tabIndex: number;
    setHandler: SetHandlerType;
    dataTestid?: string;
}