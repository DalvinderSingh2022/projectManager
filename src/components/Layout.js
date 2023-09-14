import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <main>
            <Sidebar />
            <article>
                <Topbar />
                <Outlet />
            </article>
        </main>
    )
}

export default Layout;