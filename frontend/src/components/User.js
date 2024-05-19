import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';

const User = ({ name, avatar, _id }) => {
    const [tasks, setTasks] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects?userId=${_id}&assignto=true&status=pending`)
            .then(({ data: task }) => {
                setTasks(task.length);
            });
    }, [_id])

    return (
        <div className="user flex gap2 col items-stretch">
            <div className="flex">
                <img src={avatar} alt={name} loading='lazy' />
            </div>
            <div className="flex items-start j-start col">
                <span className="name">{name}</span>
                <span className="taskscount">Pending : {tasks}</span>
            </div>
        </div>
    )
}

export default memo(User);