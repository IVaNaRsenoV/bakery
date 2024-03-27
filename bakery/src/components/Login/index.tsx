import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { Button, Input } from '../../components/index';
import { api } from '../../http/api';
import { useAppDispatch } from '../../store/reduxHelpers';
import { setAuth } from '../../reducers/authReducer';
import axios from 'axios';
import { setLoginValue } from '../../reducers/profileReducer';


export const Login = () => {

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const submitHandler = async () => {
        try {
            if (login.length > 1 && password.length > 1) {
                // api("login", "POST", { login, password })
                const result = await axios.post("http://localhost:5000/users/login", {
                    login, password
                })

                console.log(result.data);

                dispatch(setLoginValue(result.data.loginValue));

                if (result.data.login) {
                    dispatch(setAuth(false));
                } else if (result.data.login === undefined) {
                    dispatch(setAuth(true));
                    localStorage.setItem("token", result.data.ACCESS_TOKEN);
                }

                navigate("/forum");
            }
        } catch (error) {
            console.log(error);
            dispatch(setAuth(false));
            navigate("/forum");
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
                dataTestid={"login"}
            />

            <label htmlFor="password">password:</label>
            <Input
                value={"password"}
                tabIndex={2}
                setHandler={setPassword}
                dataTestid={"password"}
            />
            <Button handler={submitHandler} dataTestid={"btn"} />
        </form>
    )
}