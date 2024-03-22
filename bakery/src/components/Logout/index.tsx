import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../store/reduxHelpers';
import { setAuth } from '../../reducers/authReducer';
import { api } from '../../http/api';
import axios from 'axios';

export const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function logout() {
        // api("logout", "POST");
        await axios.post("http://localhost:5000/users/logout");
        dispatch(setAuth(false));
        navigate("/");
    }

    return (
        <div>
            <h1>Are you sure ?</h1>
            <button onClick={logout} data-testid={"btn"}>yes</button>
        </div>
    )
}