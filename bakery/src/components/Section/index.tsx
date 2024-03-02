import { FC } from "react";
import { ISection } from './type'

export const Section: FC<ISection> = ({ title, description }) => {
    return (
        <section>
            <h1>{title}</h1>
            <p>{description}</p>
        </section>
    )
}