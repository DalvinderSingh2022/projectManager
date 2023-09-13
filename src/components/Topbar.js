import React, { useContext } from 'react'
import { AppContext } from '../App';

const Topbar = () => {
    const { data } = useContext(AppContext);

    return (
        <header className='flex j-between'>
            <div className="logo">Tasker</div>
            <div className="profile flex gap2">
                <img src={data?.currentUser?.photoURL} alt={data?.currentUser?.displayName} />
                <div className=" flex col items-start">
                    <span className="name">{data?.currentUser?.displayName}</span>
                    <span className="email">{data?.currentUser?.email}</span>
                </div>
            </div>
        </header>
    )
}

export default Topbar;