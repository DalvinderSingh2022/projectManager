import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const Task = ({ title, detail, assignto, status }) => {
    const [assignUser, setAssignUser] = useState({});

    useEffect(() => {
        const database = async () => {
            const usersSnap = await getDocs(collection(db, "users"));
            usersSnap.forEach(user => {
                if (user.data().uid === assignto) {
                    setAssignUser(user.data());
                }
            });
        }
        database();
    }, [assignto]);

    const handleclick = () => {

    }

    return (
        <div className="task flex col gap2 items-stretch" onClick={handleclick}>
            <span className='title'>{title}</span>
            <p className="detail">{detail}</p>
            <div className="flex items-start col"><span className='status' style={{ backgroundColor: `${status === 'completed' ? `var(--green)` : `var(--yellow)`}` }}>{status}</span></div>
            <div className="flex j-between">
                <div className="assign user">
                    <img src={assignUser.photoURL} alt={assignUser.displayName} />
                </div>
                <span class="btn round flex gap2 material-symbols-outlined comments"><span>{0} </span>comment</span>
            </div>
        </div>
    )
}

export default Task;