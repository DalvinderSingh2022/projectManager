import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AppContext } from '../App';

const Sidebar = () => {
    const navigate = useNavigate();
    const { setcurrentUser } = useContext(AppContext);

    const handleclick = () => {
        signOut(auth)
            .then(setcurrentUser(null))
            .catch(error => console.error(error));
        navigate('/');
    }

    return (
        <nav className='flex col items-stretch gap j-between'>
            <button className='round btn home flex pri' onClick={() => document.querySelector("main").classList.toggle('close')}>
                <span class="material-symbols-outlined">drag_handle</span>
            </button>
            <div className="flex j-start col items-stretch gap">
                <div className="logo">Tasker</div>
                <NavLink to='/' className={isActive => (isActive ? "pri " : '') + "btn flex link j-start"} end>
                    <span className="material-symbols-outlined">dashboard</span>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to='/tasks' className={isActive => (isActive ? 'pri ' : '') + "btn flex link j-start"} end>
                    <span className="material-symbols-outlined">library_books</span>
                    <p>Tasks</p>
                </NavLink>
                <NavLink to='/users' className={isActive => (isActive ? 'pri ' : '') + "btn flex link j-start"} end>
                    <span className="material-symbols-outlined">group</span>
                    <p>Users</p>
                </NavLink>
                <NavLink to='/profile' className={isActive => (isActive ? 'pri ' : '') + "btn flex link j-start"} end>
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