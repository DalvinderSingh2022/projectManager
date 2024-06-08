import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBox from './AlertBox';
import axios from "axios";
import { AppContext } from '../App';
import Loading from './Loading';

const Createtask = ({ callback, _id, title, detail, duedate, assignto, assignby, status, isEdit = false }) => {
    const [alert, setAlert] = useState(null);
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/users")
            .then(({ data: users }) => {
                setUsers(users);
                if (!callback) setLoading(false);
            });
    }, [currentUser, callback]);

    useEffect(() => {
        setTask({
            title,
            detail,
            duedate: duedate || new Date().toISOString(),
            assignto: assignto || users[0]?._id,
            assignby: assignby || currentUser?._id,
            status: status || 'pending'
        });
        if (callback) setLoading(false);
    }, [title, detail, duedate, assignto, assignby, status, currentUser, users, callback]);

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask(prev => { return { ...prev, [name]: value } });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!isEdit) {
            axios.post("http://localhost:5000/api/projects", task)
                .then(({ data: task }) => {
                    setTask(prev => ({ ...prev, title: '', detail: '', duedate: '', assignto: '' }));
                    setAlert({ message: `Task ${task.title} saved`, type: 'verified' });
                    if (callback) callback();
                })
                .catch((error) => {
                    console.error(error);
                    setAlert({ message: error.response.data.message, type: 'report' });
                });
            return;
        }

        axios.put(`http://localhost:5000/api/projects/${_id}`, task)
            .then(({ data: task }) => {
                setTask(prev => ({ ...prev, title: '', detail: '', duedate: '', assignto: '' }));
                setAlert({ message: `Changes in ${task.title} saved`, type: 'verified' });
                if (callback) callback();
            })
            .catch((error) => {
                console.error(error);
                setAlert({ message: error.response.data.message, type: 'report' });
            });
    }

    const handledelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${_id}`)
                .then(async () => {
                    await axios.delete(`http://localhost:5000/api/projects/${_id}/comments`)
                        .then(() => navigate('/tasks'));
                })
        } catch (error) {
            console.error(error);
            setAlert({ message: error.response.data.message, type: 'report' });
        };
    }

    return (
        <>
            {!loading ? (
                <form className='flex col items-stretch gap w-full' onSubmit={e => handlesubmit(e)}>
                    <div className='flex col items-stretch w-full'>
                        <label htmlFor="title">Name</label>
                        <div className="flex gap2 items-strech">
                            <input
                                disabled={!(currentUser?._id === assignby) && isEdit}
                                className=' w-full'
                                type="text"
                                id='title'
                                name='title'
                                placeholder='Enter title'
                                value={task.title}
                                onChange={(e) => handlechange(e)}
                            />
                            {(!isEdit || currentUser?._id === assignby || currentUser?._id === assignto) &&
                                <button type="submit" className="btn pri round flex">
                                    Save
                                </button>
                            }
                            {(currentUser?._id === assignby && isEdit) &&
                                <button type="button" className="btn pri round flex" style={{ backgroundColor: 'var(--red)' }} onClick={handledelete}>
                                    Delete
                                </button>
                            }
                        </div>
                    </div>
                    <div className='flex col items-stretch w-full'>
                        <label htmlFor="detail">Detail</label>
                        <textarea
                            disabled={!(currentUser?._id === assignby) && isEdit}
                            rows={6}
                            type="text"
                            id='detail'
                            name='detail'
                            placeholder='Enter detail'
                            value={task.detail}
                            onChange={(e) => handlechange(e)}
                        />
                    </div>



                    <div className="flex wrap gap items-stretch">
                        {isEdit && <div className='flex col items-stretch column'>
                            <label htmlFor="duedate">Assign by</label>
                            <input
                                disabled
                                type="text"
                                id='assignby'
                                name='assignby'
                                value={(users.filter(user => user._id === task.assignby)?.[0]?.name) + (task.assignby === currentUser._id ? " (You)" : "")}
                            />
                        </div>}
                        {(currentUser?._id === assignby || currentUser?._id === assignto) &&
                            <div className='flex col items-stretch column'>
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
                        <div className='flex col items-stretch column'>
                            <label htmlFor="duedate">Due Date</label>
                            <input
                                disabled={!(currentUser?._id === assignby) && isEdit}
                                type="date"
                                id='dueate'
                                name='duedate'
                                value={new Date(task.duedate || new Date()).toISOString().split("T")[0]}
                                onChange={(e) => handlechange(e)}
                            />
                        </div>
                        <div className='flex col items-stretch w-full column'>
                            <label htmlFor="assign">Assign to</label>
                            <select
                                disabled={!(currentUser?._id === assignby) && isEdit}
                                name="assignto"
                                id="assign"
                                value={task.assignto}
                                onChange={(e) => handlechange(e)}>
                                {(currentUser._id === task.assignto) && <option value={currentUser._id}>{currentUser.name}</option>}
                                {users && users.map(user => user._id !== currentUser._id && <option key={user._id} value={user._id}>{user.name}</option>)}
                            </select>
                        </div>
                    </div>
                </form>
            ) : <Loading />}
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default Createtask;