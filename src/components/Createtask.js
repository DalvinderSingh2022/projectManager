import React, { memo, useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Createtask = ({ uid, title, detail, duedate, assignto, assignby, status, isEdit = false }) => {
    const { currentUser, dbUsers, updatedb } = useContext(AppContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState({});
    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask(prev => {
            return {
                ...prev,
                [name]: value,
                uid: prev?.assignby + ":" + prev?.assignto + ":" + new Date().getTime(),
            }
        });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        const database = async () => {
            setDoc(doc(db, "tasks", task.uid), { ...task })
            handledelete();
        }
        database();
    }

    const handledelete = () => {
        const database = async () => {
            if (isEdit) {
                await deleteDoc(doc(db, "tasks", uid))
                    .then(updatedb(prev => !prev));
                setTimeout(() => navigate('/tasks'), 2000);
            }
        }
        database();
    }

    useEffect(() => {
        const Users = [];
        dbUsers.forEach(user => {
            if (user.uid !== currentUser?.user.uid) {
                Users.push(user);
            }
        });
        setUsers(Users);
    }, [currentUser, dbUsers]);

    useEffect(() => setTask({
        uid: uid,
        title: title,
        detail: detail,
        duedate: duedate,
        assignto: assignto,
        assignby: assignby || currentUser?.user.uid,
        status: status || 'pending'
    }), [uid, title, detail, duedate, assignto, assignby, status, currentUser]);

    return (
        <form className='flex col items-stretch gap w-full' onSubmit={e => handlesubmit(e)}>
            <div className='flex col items-stretch w-full'>
                <label htmlFor="title">Name</label>
                <div className="flex gap2 items-strech">
                    <input
                        disabled={currentUser?.user.uid !== assignby && isEdit}
                        className=' w-full'
                        type="text"
                        id='title'
                        name='title'
                        placeholder='Enter title'
                        value={task.title}
                        onChange={(e) => handlechange(e)}
                    />
                    {(!isEdit || currentUser?.user.uid === assignby) && <button type="submit" className="btn pri round material-symbols-outlined">add</button>}
                    {(currentUser?.user.uid === assignby && isEdit) && <button type="button" className="btn pri round material-symbols-outlined" style={{ backgroundColor: 'var(--red)' }} onClick={() => handledelete()}>Delete</button>}
                </div>
            </div>
            <div className='flex col items-stretch w-full'>
                <label htmlFor="detail">Detail</label>
                <textarea
                    disabled={currentUser?.user.uid !== assignby && isEdit}
                    rows={6}
                    type="text"
                    id='detail'
                    name='detail'
                    placeholder='Enter detail'
                    value={task.detail}
                    onChange={(e) => handlechange(e)}
                />
            </div>
            <div className="flex gap items-stretch">
                {currentUser?.user.uid === assignby &&
                    <div className='flex col items-stretch'>
                        <label htmlFor="assign">Status</label>
                        <select
                            name="status"
                            id="status"
                            value={task.status}
                            onChange={(e) => handlechange(e)}>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>}
                <div className='flex col items-stretch '>
                    <label htmlFor="duedate">Due Date</label>
                    <input
                        disabled={currentUser?.user.uid !== assignby && isEdit}
                        type="date"
                        id='dueate'
                        name='duedate'
                        value={task.duedate}
                        onChange={(e) => handlechange(e)}
                    />
                </div>
                <div className='flex col items-stretch w-full'>
                    <label htmlFor="assign">Assign to</label>
                    <select
                        disabled={currentUser?.user.uid !== assignby && isEdit}
                        name="assignto"
                        id="assign"
                        value={task.assignto}
                        onChange={(e) => handlechange(e)}>
                        <option value={''}>users</option>
                        {users && users.map(user => <option key={user.uid} value={user.uid}>{user.displayName}</option>)}
                    </select>
                </div>
            </div>
        </form>
    )
}

export default memo(Createtask);