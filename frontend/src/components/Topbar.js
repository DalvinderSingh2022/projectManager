import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';

const Topbar = () => {
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/users/current")
            .then(({ data: user }) => {
                setCurrentUser(user);
            });
    }, []);

    if (localStorage.getItem("projectManager") && !currentUser) {
        return <Loading full={true} />
    }

    if (!currentUser) {
        return <Navigate to='/login' />
    }

    return (
        <header className='flex j-end'>
            <button className='btn round home pri flex' onClick={() => document.querySelector("main").classList.toggle('close')}>
                <span className="material-symbols-outlined">drag_handle</span>
            </button>
            <div className="profile flex gap2">
                <img src={currentUser.avatar} alt={currentUser.name} loading='lazy' />
                <div className=" flex col items-start">
                    <span className="name">{currentUser.name}</span>
                    <span className="email">{currentUser.email}</span>
                </div>
            </div>
        </header>
    )

}

export default Topbar;