import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/index';
import styles from './Register.module.scss';

export const Register = () => {

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [accessToken, setAccessToken] = useState(null);

    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            if (login.length > 1 && password.length > 1) {
                const result = await axios.post("http://localhost:5000/users/register", {
                    login, password
                })

                console.log('access token ', result.data.access_token);
                localStorage.setItem("token", result.data.access_token);
                setAccessToken(result.data.access_token);
                navigate("/login");
            }
        } catch (error) {
            localStorage.setItem("users", "This user already exists");
        }
    }

    return (
        <form className={styles.form}>
            <h2>Register</h2>
            <label htmlFor="login">login:</label>
            <Input
                dataTestid={"login"}
                value={"login"}
                tabIndex={1}
                setHandler={setLogin}
            />

            <label htmlFor="password">password:</label>
            <Input
                dataTestid={"password"}
                value={"password"}
                tabIndex={2}
                setHandler={setPassword}
            />
            <Button handler={submitHandler} dataTestid={"btn-register"} />
        </form>
    )
}