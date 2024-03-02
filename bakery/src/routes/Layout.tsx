import { Outlet, Route, Routes } from 'react-router'

import { Form, Forum } from 'components/index';
import { Main } from 'pages';
import { Section, Login, Logout } from 'components/index';

export const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about-us" element={<Section title={"About us"} description='Lorem about us' />} />
                <Route path="/about-shop" element={<Section title={"About online shop"} description={'Lorem about online shop'} />} />
                <Route path="/catalog" element={<Section title={"Catalog"} description='Lorem catalog' />} />
                <Route path="/form" element={<Form />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forum" element={<Forum />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
            <Outlet />
        </>
    )
}