import React, { useCallback, useContext, useEffect, useState } from 'react';
import Createtask from '../components/Createtask';
import Loading from '../components/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../components/AlertBox';
import { AppContext } from '../App';

const Dashboard = () => {
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(null);
    const { currentUser } = useContext(AppContext);

    const loadTasks = useCallback(() => {
        setTasks(null);
        axios.get(`http://localhost:5000/api/projects?userId=${currentUser._id}&assignto=true`)
            .then(({ data: task }) => {
                setTasks(prev => prev ? [...prev, ...task] : task);
            });
        axios.get(`http://localhost:5000/api/projects?userId=${currentUser._id}&assignby=true`)
            .then(({ data: task }) => {
                setTasks(prev => prev ? [...prev, ...task] : task);
            });
    }, [currentUser._id]);

    useEffect(() => loadTasks(), [loadTasks]);

    return (
        <>
            <div className='statistics'>
                <div className="box flex col items-start">
                    <span className="title">Assign by you</span>
                    <div className="stat">{tasks?.length > 0 ? tasks.filter(a => a.assignby === (currentUser._id)).length : (tasks?.length !== 0 ? <Loading /> : 0)}</div>
                </div>
                <div className="box flex col items-start">
                    <span className="title">Assign to you</span>
                    <div className="stat">{tasks?.length > 0 ? tasks.filter(a => a.assignto === (currentUser._id)).length : (tasks?.length !== 0 ? <Loading /> : 0)}</div>
                </div>
                <div className="box flex col items-start">
                    <span className="title">Completed Tasks</span>
                    <div className="stat">{tasks?.length > 0 ? tasks.filter(a => a.status === 'completed').length : (tasks?.length !== 0 ? <Loading /> : 0)}</div>
                </div>
                <div className="box flex col items-start">
                    <span className="title">Pending Tasks</span>
                    <div className="stat">{tasks?.length > 0 ? tasks.filter(a => a.status === 'pending').length : (tasks?.length !== 0 ? <Loading /> : 0)}</div>
                </div>
            </div>

            <div className="container">
                <section className='flex col gap2 items-start'>
                    <div className="heading">Create Task</div>
                    <Createtask callback={loadTasks} />
                </section>
                <section className='flex col j-start items-stretch gap2'>
                    <div className="heading">Tasks</div>
                    <div className="flex col tasks items-stretch j-start">
                        {tasks?.length > 0 ? tasks.map(task => {
                            return (
                                <div className="task flex col items-start gap" key={task._id} onClick={() => navigate(`/tasks/${task._id}`)}>
                                    <span className="title w-full">{task.title}</span>
                                    <div className='flex j-between w-full'>
                                        <div className="due">Due: {new Date(task.duedate).toDateString()}</div>
                                        <span className="status" style={{ backgroundColor: `${task.status === 'completed' ? `var(--green)` : `var(--yellow)`}` }}>{task.status}</span>
                                    </div>
                                </div>)
                        }) : (tasks?.length !== 0 ? <Loading /> : <div>There is no task</div>)}
                    </div>
                </section >
            </div >
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default Dashboard;