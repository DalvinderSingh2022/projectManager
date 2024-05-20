import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import AlertBox from './AlertBox';

const User = ({ name, avatar, _id }) => {
    const [alert, setAlert] = useState(null);
    const [tasks, setTasks] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects?userId=${_id}&assignto=true&status=pending`)
            .then(({ data: task }) => {
                setTasks(task.length);
            }).catch((error) => {
                console.error(error);
                setAlert({ message: error.response.data.message, type: 'report' });
            });;
    }, [_id])

    return (
        <>
            <div className="user flex gap2 col items-stretch">
                <div className="flex">
                    <img src={avatar} alt={name} loading='lazy' />
                </div>
                <div className="flex items-start j-start col">
                    <span className="name">{name}</span>
                    <span className="taskscount">Pending : {tasks}</span>
                </div>
            </div>
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default memo(User);