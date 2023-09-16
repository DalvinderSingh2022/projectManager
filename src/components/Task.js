import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

const Task = ({ title, detail, assignto, status, uid }) => {
    const { dbUsers } = useContext(AppContext)
    const [assignUser, setAssignUser] = useState({});

    useEffect(() => {
        dbUsers.forEach(user => {
            if (user.uid === assignto) {
                setAssignUser(user);
            }
        });
    }, [assignto, dbUsers]);

    return (
        <div className="task flex col gap2 items-stretch">
            <div className="flex j-between">
                <span className='title'>{title}</span>
                <Link to={`/tasks/${uid}`}><button className="btn round flex gap2 material-symbols-outlined">arrow_outward</button></Link>
            </div>
            <p className="detail">{detail}</p>
            <div className="flex items-start col"><span className='status' style={{ backgroundColor: `${status === 'completed' ? `var(--green)` : `var(--yellow)`}` }}>{status}</span></div>
            <div className="flex j-between">
                <div className="assign user" title={assignUser.displayName}>
                    <img src={assignUser.photoURL} alt={assignUser.displayName} />
                </div>
                <button className="btn round flex gap2 material-symbols-outlined comments"><span>{0} </span>comment</button>
            </div>
        </div>
    )
}

export default Task;