import React from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className='flex col items-stretch gap j-between'>
            <div className="flex j-start col items-stretch gap">
                <NavLink to='/' className="pri btn flex link j-start">
                    <span class="material-symbols-outlined">dashboard</span>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to='tasks' className="btn flex link j-start">
                    <span class="material-symbols-outlined">library_books</span>
                    <p>Tasks</p>
                </NavLink>
                <NavLink to='users' className="btn flex link j-start">
                    <span class="material-symbols-outlined">group</span>
                    <p>Users</p>
                </NavLink>
                <NavLink to='profile' className="btn flex link j-start">
                    <span class="material-symbols-outlined">account_circle</span>
                    <p>Profile</p>
                </NavLink>
            </div>
            <button className="btn flex link j-between signout">
                <span class="material-symbols-outlined">logout</span>
                <p>Sign Out</p>
            </button>
        </nav>
    )
}

export default Sidebar;