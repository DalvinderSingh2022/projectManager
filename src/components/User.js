import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';

const User = ({ displayName, photoURL, uid }) => {
    const { dbTasks } = useContext(AppContext)
    const [tasks, setTasks] = useState(0);

    useEffect(() => {
        const Tasks = [];
        dbTasks.forEach(task => {
            if (task.uid.includes(uid)) {
                Tasks.push(task);
            }
        });
        setTasks(Tasks.length);
    }, [dbTasks, uid])

    return (
        <div className="user flex gap2 col items-stretch">
            <div className="flex">
                <img src={photoURL} alt={displayName} />
            </div>
            <div className="flex col items-start j-start">
                <span className="name">{displayName}</span>
                <span className="taskscount">Tasks: {tasks}</span>
            </div>
        </div>
    )
}

export default User;