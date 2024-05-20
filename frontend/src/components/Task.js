import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AlertBox from './AlertBox';

const Task = ({ title, detail, assignto, assignby, status, _id }) => {
    const [alert, setAlert] = useState(null);
    const [commentcount, setcommentcount] = useState(0);
    const [assignUser, setAssignUser] = useState({});
    const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/${_id}`)
            .then(({ data: task }) => {
                axios.get(`http://localhost:5000/api/users/${task.assignto}`)
                    .then(({ data: user }) => {
                        setAssignUser(user);
                    });
                axios.get(`http://localhost:5000/api/projects/${_id}/comments`)
                    .then(({ data: comments }) => {
                        setcommentcount(comments.length);
                    });
            }).catch((error) => {
                console.error(error);
                setAlert({ message: error.response.data.message, type: 'report' });
            });
        axios.get("http://localhost:5000/api/users/current")
            .then(({ data: user }) => {
                setCurrentUser(user);
            });
    }, [_id])

    return (
        <>
            <div className="task flex col gap2 items-stretch" onClick={() => navigate(`/tasks/${_id}`)}>
                <span className='title'>{title}</span>
                <p className="detail">{detail}</p>
                <div className="flex j-start gap2">
                    <span className='status' style={{ backgroundColor: `${status === 'completed' ? `var(--green)` : `var(--yellow)`}` }}>{status}</span>
                    {assignby === currentUser._id && <span className='status' style={{ backgroundColor: 'var(--primary)' }}>assign by you</span>}
                    {assignto === currentUser._id && <span className='status' style={{ backgroundColor: 'var(--red)' }}>assign to you</span>}
                </div>
                <div className="flex j-between">
                    <div className="assign user" title={assignUser.name}>
                        <img src={assignUser.avatar} alt={assignUser.name} loading='lazy' />
                    </div>
                    <span className="btn round flex gap2 material-symbols-outlined comments"><span>{commentcount} </span>comment</span>
                </div>
            </div>
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default memo(Task);