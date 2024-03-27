import React, { useState, useEffect } from 'react';
import styles from './Forum.module.scss';
import socket from '../../assets/socket/index';
import { useAppDispatch, useAppSelector } from '../../store/reduxHelpers';
import { setMsg } from '../../reducers/messagesForumReducer';

export const Forum = () => {
    const [message, setMessage] = useState<string>("")

    const dispatch = useAppDispatch();

    const auth = useAppSelector(state => state.auth.auth);
    const { login } = useAppSelector(data => data.profile);
    const messagesData = useAppSelector(data => data.msgForum.msg);

    useEffect(() => {

        const token = localStorage.getItem("token");

        socket.on("forum", (data) => {
            console.log(data + " " + token);
            dispatch(setMsg(data));
        })

        setMessage("");

        console.log(auth);

        return () => {
            socket.off("forum");
        }
    }, [])

    const setMessagesHandler = async () => {
        await socket.emit("forum", `${login} ` + message);
        setMsg(message)
        setMessage("");
    };

    return (
        <>
            {
                auth ? (
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
                                messagesData.length > 0 ?
                                    messagesData.map((msg: string, i) => {
                                        return (
                                            <p key={i}>{msg}</p>
                                        )
                                    }) : null
                            }
                        </div>
                    </section>
                ) : <h1>Auth false</h1>
            }
        </>
    )
}