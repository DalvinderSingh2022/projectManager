import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AppContext } from '../App';

const Edittask = ({ uid, title, detail, duedate, assignto, assignby, status }) => {
    const { currentUser } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState({
        uid: uid || null,
        title: title || null,
        detail: detail || null,
        duedate: duedate || null,
        assignto: assignto || null,
        assignby: assignby || currentUser?.user.uid,
        status: status || 'pending'
    });

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask(prev => ({
            ...prev,
            [name]: value,
            uid: prev?.assignby + ":" + prev?.assignto + ":" + new Date()
        }));
    }

    useEffect(() => {
        const database = async () => {
            const dbUsers = [];
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach(user => {
                if (user.data().uid !== currentUser.user.uid) {
                    dbUsers.push(user.data());
                }
            });
            setUsers(dbUsers);
        }
        database();
    }, [currentUser]);

    const handlesubmit = async (e) => {
        e.preventDefault();
        const database = async () => {
            setDoc(doc(db, "tasks", task.uid), { ...task });
        }
        database();
    }

    return (
        <form className='flex col items-stretch gap w-full' onSubmit={e => handlesubmit(e)}>
            <div className='flex col items-stretch w-full'>
                <label htmlFor="title">Name</label>
                <div className="flex gap2 items-strech">
                    <input
                        className=' w-full'
                        type="text"
                        id='title'
                        name='title'
                        placeholder='Enter title'
                        value={task.title || ''}
                        onChange={(e) => handlechange(e)}
                    />
                    <button type="submit" className='btn pri round material-symbols-outlined'>Add</button>
                </div>
            </div>
            <div className='flex col items-stretch w-full'>
                <label htmlFor="detail">Email</label>
                <textarea
                    rows={6}
                    type="text"
                    id='detail'
                    name='detail'
                    placeholder='Enter detail'
                    value={task.detail || ''}
                    onChange={(e) => handlechange(e)}
                />
            </div>
            <div className="flex gap items-stretch">
                <div className='flex col items-stretch '>
                    <label htmlFor="duedate">Due Date</label>
                    <input
                        type="date"
                        id='dueate'
                        name='duedate'
                        value={task.duedate || ''}
                        onChange={(e) => handlechange(e)}
                    />
                </div>

                <div className='flex col items-stretch w-full'>
                    <label htmlFor="assign">Assign to</label>
                    <select
                        name="assignto"
                        id="assign"
                        value={task.assignto || ''}
                        onChange={(e) => handlechange(e)}>
                        <option value={null}>options</option>
                        {users && users.map(user => <option key={user.uid} value={user.uid}>{user.displayName}</option>)}
                    </select>
                </div>
            </div>
        </form>
    )
}

export default Edittask;