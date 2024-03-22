global.setImmediate = (callback, ...args) => setTimeout(callback, 0, ...args);

import { screen, render, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { store } from '../../store';
import { Register } from './index';

describe("Register test", () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    test("Register test 1", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        );

        const loginInput = screen.getByTestId("login");
        const passwordInput = screen.getByTestId("password");
        const buttonInput = screen.getByTestId("btn-register");

        fireEvent.change(loginInput, { target: { value: "novapost@gmail.com" }});
        fireEvent.change(passwordInput, { target: { value: "123" }});

        mock.onPost("http://localhost:5000/users/register").reply(200, {
            access_token: "ACCESS_TOKEN"
        });

        await act(async () => {
            fireEvent.click(buttonInput);
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(localStorage.getItem("token")).toBe("ACCESS_TOKEN");
        expect(window.location.pathname).toBe("/login");
    });

    test("Register test 2 - User already exists", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        );

        const loginInput = screen.getByTestId("login");
        const passwordInput = screen.getByTestId("password");
        const buttonInput = screen.getByTestId("btn-register");

        fireEvent.change(loginInput, { target: { value: "existinguser@gmail.com" }});
        fireEvent.change(passwordInput, { target: { value: "password123" }});

        mock.onPost("http://localhost:5000/users/register").reply(400, {
            error: "This user already exists"
        });

        await act(async () => {
            fireEvent.click(buttonInput);
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(localStorage.getItem("users")).toBe("This user already exists");
    })
});

