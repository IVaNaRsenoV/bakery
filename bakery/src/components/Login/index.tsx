import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { Button, Input } from 'components/index';

export const Login = () => {

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            if (login.length > 1 && password.length > 1) {
                await fetch("http://localhost:5000/users/login", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ login, password })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Ошибка сети!");
                        }
                        return response.text();
                    })
                    .then(data => console.log('Значение куки: ', data))
                    .catch(error => console.error("Произошла ошибка!"))
                navigate("/forum");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className={styles.form}>
            <h2>Login</h2>
            <label htmlFor="login">login:</label>
            <Input
                value={"login"}
                tabIndex={1}
                setHandler={setLogin}
            />

            <label htmlFor="password">password:</label>
            <Input
                value={"password"}
                tabIndex={2}
                setHandler={setPassword}
            />
            <Button handler={submitHandler} />
        </form>
    )
}