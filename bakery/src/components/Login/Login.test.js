global.setImmediate = (callback, ...args) => setTimeout(callback, 0, ...args);

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux'
import { store } from '../../store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Login } from './index'
import { act } from 'react-dom/test-utils';
import axios from 'axios';

describe("Login test", () => {
    let mock;

    beforeEach(()  => {
        mock = new MockAdapter(axios);
    })

    afterEach(() => {
        mock.restore();
    })

    test("Login test 1", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        )

        const loginInput = screen.getByTestId("login");
        const passwordInput = screen.getByTestId("password");
        const btn = screen.getByTestId("btn");

        fireEvent.change(loginInput, { target: { value: "login@gmail.com" }});
        fireEvent.change(passwordInput, { target: { value: "password123" }});

        mock.onPost("http://localhost:5000/users/login").reply(200, {
            access_token: "ACCESS_TOKEN"
        })
        
        await act( async () => {
            fireEvent.click(btn);
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        await waitFor(() => {
            expect(window.location.pathname).toBe("/forum");
        })
    })
})
