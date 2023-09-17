import React, { memo, useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

const Task = ({ title, detail, assignto, assignby, status, uid }) => {
    const { currentUser, dbcomments } = useContext(AppContext);
    const [commentcount, setcommentcount] = useState(0);
    const [assignUser, setAssignUser] = useState({});
    const { dbUsers } = useContext(AppContext);

    useEffect(() => {
        dbUsers.forEach(user => {
            if (user.uid === assignto) {
                setAssignUser(user);
            }
        });
        setcommentcount(dbcomments.filter(a => a.uid.split("$")[0] === uid).length);
    }, [assignto, dbUsers, dbcomments, uid, setAssignUser]);

    return (
        <div className="task flex col gap2 items-stretch">
            <div className="flex j-between">
                <span className='title'>{title}</span>
                <Link to={`/tasks/${uid}`}><button className="btn round flex gap2 material-symbols-outlined">arrow_outward</button></Link>
            </div>
            <p className="detail">{detail}</p>
            <div className="flex j-start gap2">
                <span className='status' style={{ backgroundColor: `${status === 'completed' ? `var(--green)` : `var(--yellow)`}` }}>{status}</span>
                {assignby === currentUser.user.uid && <span className='status' style={{ backgroundColor: 'var(--primary)' }}>assign by you</span>}
                {assignto === currentUser.user.uid && <span className='status' style={{ backgroundColor: 'var(--red)' }}>assign to you</span>}
            </div>
            <div className="flex j-between">
                <div className="assign user" title={assignUser.displayName}>
                    <img src={assignUser.photoURL} alt={assignUser.displayName} loading='lazy' />
                </div>
                <span className="btn round flex gap2 material-symbols-outlined comments"><span>{commentcount} </span>comment</span>
            </div>
        </div>
    )
}

export default memo(Task);