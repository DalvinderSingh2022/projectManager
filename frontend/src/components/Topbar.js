import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";
import axios from 'axios';
import { AppContext } from '../App';

const Topbar = () => {
    const { currentUser, setCurrentUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/users/current", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(({ data: user }) => setCurrentUser(user))
            .catch(() => navigate("/login"));

    }, [navigate, setCurrentUser]);

    if (!currentUser) {
        return <Loading full={true} />
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