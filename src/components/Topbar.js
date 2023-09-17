import React, { useContext } from 'react'
import { AppContext } from '../App';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

const Topbar = () => {
    const { currentUser } = useContext(AppContext);

    if (localStorage.getItem("taskUser") && !currentUser) {
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
                <img src={currentUser.user.photoURL} alt={currentUser.user.displayName} loading='lazy' />
                <div className=" flex col items-start">
                    <span className="name">{currentUser.user.displayName}</span>
                    <span className="email">{currentUser.user.email}</span>
                </div>
            </div>
        </header>
    )

}

export default Topbar;