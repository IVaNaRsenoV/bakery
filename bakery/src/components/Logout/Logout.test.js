import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import MockAdapter from "axios-mock-adapter";
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";
import { Logout } from "./index";
import { store } from '../../store';
import { act } from 'react-dom/test-utils';

describe("Logout test", () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    })

    test("Logout test 1", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Logout />
                </Router>
            </Provider>
        );

        const btnLogout = screen.getByTestId("btn");
        
        mock.onPost("http://localhost:5000/users/logout").reply(200, {
            logout: "true"
        });

        await act( async () => {
            fireEvent.click(btnLogout);
            await new Promise(resolve => setTimeout(resolve, 0))
        })

        await waitFor(() => {
            expect(window.location.pathname).toBe("/");
        })
    })
})