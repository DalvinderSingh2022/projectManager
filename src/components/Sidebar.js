import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleclick = () => {
        signOut(auth).catch(error => console.error(error));
        navigate('/');
    }

    return (
        <nav className='flex col items-stretch gap j-between'>
            <div className="flex j-start col items-stretch gap">
                <div className="logo">Tasker</div>
                <NavLink to='/' className="pri btn flex link j-start">
                    <span className="material-symbols-outlined">dashboard</span>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to='tasks' className="btn flex link j-start">
                    <span className="material-symbols-outlined">library_books</span>
                    <p>Tasks</p>
                </NavLink>
                <NavLink to='users' className="btn flex link j-start">
                    <span className="material-symbols-outlined">group</span>
                    <p>Users</p>
                </NavLink>
                <NavLink to='profile' className="btn flex link j-start">
                    <span className="material-symbols-outlined">account_circle</span>
                    <p>Profile</p>
                </NavLink>
            </div>
            <button className="btn flex link j-between signout" onClick={handleclick}>
                <span className="material-symbols-outlined">logout</span>
                <p>Sign Out</p>
            </button>
        </nav>
    )
}

export default Sidebar;