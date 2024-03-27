import { Outlet, Route, Routes } from 'react-router'
import { Register, Forum, Profile } from 'components/index';
import { Section, Login, Logout } from 'components/index';
import { Main } from 'pages';

export const Layout = () => {

    return (
        <>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path="/" element={<Main />} />
                <Route path="/about-us" element={<Section title={"About us"} description='Lorem about us' />} />
                <Route path="/about-shop" element={<Section title={"About online shop"} description={'Lorem about online shop'} />} />
                <Route path="/catalog" element={<Section title={"Catalog"} description='Lorem catalog' />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Outlet />
        </>
    )
}