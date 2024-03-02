import React, { useState, useEffect } from 'react';
import styles from './Forum.module.scss';
import socket from 'assets/socket';

export const Forum = () => {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<string[] | []>([])

    useEffect(() => {
        socket.on("forum", (data) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]);
        })

        setMessage("");

        return () => {
            socket.off("forum");
        }
    }, [])

    const setMessagesHandler = async () => {
        await socket.emit("forum", message);
        setMessage("");
    };

    return (
        <section className={styles.forum}>
            <div>
                <input
                    type="text"
                    placeholder="write message"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setMessage(event.target.value)
                    }}
                    value={message}
                />
                <button onClick={setMessagesHandler} >
                    submit
                </button>
            </div>
            <div className={styles.forum__container}>
                {
                    messages.length > 0 ?
                        messages.map((msg: string, i) => {
                            return (
                                <p key={i}>{msg}</p>
                            )
                        }) : null
                }
            </div>
        </section>
    )
}