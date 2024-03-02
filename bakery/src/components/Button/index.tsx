import { FC } from 'react';

interface IButton {
    handler: () => void;
}

export const Button: FC<IButton> = ({ handler }) => {
    return (
        <input type="button" value="submit" onClick={handler} />
    )
}