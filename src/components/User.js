import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

const User = ({ displayName, photoURL, uid }) => {
    const [tasks, setTasks] = useState(0);

    useEffect(() => {
        const database = async () => {
            const dbTasks = [];
            const querySnapshot = await getDocs(collection(db, "tasks"));
            querySnapshot.forEach(task => {
                if (task.data().uid.includes(uid)) {
                    dbTasks.push(task.data());
                }
            });
            setTasks(dbTasks.length);
        }
        database();
    }, [uid])

    return (
        <div className="user flex gap2 col items-stretch">
            <div className="flex">
                <img src={photoURL} alt={displayName} />
            </div>
            <div className="flex col items-start j-start">
                <span className="name">{displayName}</span>
                <span className="tasks">Tasks: {tasks}</span>
            </div>
        </div>
    )
}

export default User;