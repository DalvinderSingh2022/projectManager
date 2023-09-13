import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <>
            <Topbar />
            <main>
                <Sidebar />
                <Outlet />
            </main>
        </>
    )
}

export default Layout;