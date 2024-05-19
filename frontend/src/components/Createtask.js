import React, { memo, useContext, useEffect, useState } from 'react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import AlertBox from './AlertBox';
import { db } from '../firebase';

const Createtask = ({ uid, title, detail, duedate, assignto, assignby, status, isEdit = false }) => {
    const { currentUser, dbUsers, updatedb } = useContext(AppContext);
    const [alert, setAlert] = useState(null);
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState({});
    const navigate = useNavigate();

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
            if (!task.title || !task.detail || !task.duedate || !task.assignto) {
                setAlert({ message: "All fields are required can't be null or empty", type: 'report' });
            } else {
                setDoc(doc(db, "tasks", task.uid), { ...task })
                    .then(() => {
                        setAlert({ message: 'Task ' + title + ' saved', type: 'verified' });
                        setTimeout(() => {
                            setTask(prev => ({ ...prev, title: '', detail: '', duedate: '', assignto: '' }));
                            isEdit ? handledelete() : updatedb(prev => !prev);
                        }, 1500);
                    })
                    .catch(error => {
                        setAlert({ message: error.message, type: 'report' });
                        console.error(error);
                    });
            }
        }
        database();
    }

    const handledelete = () => {
        const database = async () => {
            await deleteDoc(doc(db, "tasks", uid))
                .then(() => {
                    if (!isEdit) { setAlert({ message: 'Task ' + task.title + ' deleted', type: 'warning' }) };
                    setTimeout(() => {
                        navigate('/tasks');
                        updatedb(prev => !prev);
                    }, 500);
                })
                .catch(error => {
                    setAlert({ message: error.message, type: 'report' });
                    console.error(error);
                });
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
        <>
            <form className='flex col items-stretch gap w-full' onSubmit={e => handlesubmit(e)}>
                <div className='flex col items-stretch w-full'>
                    <label htmlFor="title">Name</label>
                    <div className="flex gap2 items-strech">
                        <input
                            disabled={!(currentUser?.user.uid === assignby) && isEdit}
                            className=' w-full'
                            type="text"
                            id='title'
                            name='title'
                            placeholder='Enter title'
                            value={task.title}
                            onChange={(e) => handlechange(e)}
                        />
                        {(!isEdit || currentUser?.user.uid === assignby || currentUser?.user.uid === assignto) && <button type="submit" className="btn pri round flex material-symbols-outlined">add</button>}
                        {(currentUser?.user.uid === assignby && isEdit) && <button type="button" className="btn pri round flex material-symbols-outlined" style={{ backgroundColor: 'var(--red)' }} onClick={() => handledelete()}>Delete</button>}
                    </div>
                </div>
                <div className='flex col items-stretch w-full'>
                    <label htmlFor="detail">Detail</label>
                    <textarea
                        disabled={!(currentUser?.user.uid === assignby) && isEdit}
                        rows={6}
                        type="text"
                        id='detail'
                        name='detail'
                        placeholder='Enter detail'
                        value={task.detail}
                        onChange={(e) => handlechange(e)}
                    />
                </div>
                {(currentUser?.user.uid === assignby || currentUser?.user.uid === assignto) &&
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
                <div className="flex gap items-stretch">
                    <div className='flex col items-stretch '>
                        <label htmlFor="duedate">Due Date</label>
                        <input
                            disabled={!(currentUser?.user.uid === assignby) && isEdit}
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
                            disabled={!(currentUser?.user.uid === assignby) && isEdit}
                            name="assignto"
                            id="assign"
                            value={task.assignto}
                            onChange={(e) => handlechange(e)}>
                            {users && users.map(user => <option key={user.uid} value={user.uid}>{user.displayName}</option>)}
                        </select>
                    </div>
                </div>
            </form>
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default memo(Createtask);