import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AlertBox from './AlertBox';

const Sidebar = () => {
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const btnsRef = useRef();

    const handleclick = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    return (
        <>
            <nav className='flex col items-stretch gap j-between'>
                <button className='round btn home flex pri' onClick={() => document.querySelector("main").classList.toggle('close')}>
                    <span className="material-symbols-outlined">drag_handle</span>
                </button>
                <div className="flex j-start col items-stretch gap" ref={btnsRef}>
                    <div className="logo">MANAGER</div>
                    <NavLink to='/' className="btn flex link j-start">
                        <span className="material-symbols-outlined">dashboard</span>
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to='/tasks' className="btn flex link j-start">
                        <span className="material-symbols-outlined">library_books</span>
                        <p>Tasks</p>
                    </NavLink>
                    <NavLink to='/users' className="btn flex link j-start">
                        <span className="material-symbols-outlined">group</span>
                        <p>Users</p>
                    </NavLink>
                </div>
                <button className="btn flex link j-between signout" onClick={handleclick}>
                    <span className="material-symbols-outlined">logout</span>
                    <p>Log Out</p>
                </button>
            </nav>
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default Sidebar;