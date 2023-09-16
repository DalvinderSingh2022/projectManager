import React, { useContext, useEffect, useState } from 'react';
import Createtask from '../components/Createtask';
import { AppContext } from '../App';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const { currentUser, dbTasks } = useContext(AppContext);

    useEffect(() => {
        const Tasks = [];
        dbTasks.forEach(task => {
            if (task.uid.includes(currentUser.user.uid)) {
                Tasks.push(task);
            }
        });
        setTasks(Tasks);
    }, [currentUser, dbTasks]);

    return (
        <>
            <div className='statistics'>
                <div className="box flex col items-start">
                    <span className="title">Assign by you</span>
                    <div className="stat">{tasks.filter(a => a.uid.split(":")[0].includes(currentUser.user.uid)).length}</div>
                </div>
                <div className="box flex col items-start">
                    <span className="title">Assign to you</span>
                    <div className="stat">{tasks.filter(a => a.uid.split(":")[1].includes(currentUser.user.uid)).length}</div>
                </div>
                <div className="box flex col items-start">
                    <span className="title">Completed Tasks</span>
                    <div className="stat">{tasks.filter(a => a.status === 'completed').length}</div>
                </div>
                <div className="box flex col items-start">
                    <span className="title">Pending Tasks</span>
                    <div className="stat">{tasks.filter(a => a.status === 'pending').length}</div>
                </div>
            </div>

            <div className="container">
                <section className='flex col gap2 items-start'>
                    <div className="heading">Create Task</div>
                    <Createtask />
                </section>
                <section className='flex col j-start items-stretch gap2'>
                    <div className="heading">Tasks</div>
                    <div className="flex col tasks items-stretch j-start">
                        {tasks && tasks.map(task => {
                            return (
                                <div className="task flex j-between" key={task.uid}>
                                    <div>
                                        <span className="title">{task.title}</span>
                                        <div className="due">{task.duedate}</div>
                                    </div>
                                    <span className="status" style={{ backgroundColor: `${task.status === 'completed' ? `var(--green)` : `var(--yellow)`}` }}>{task.status}</span>
                                </div>);
                        })}
                    </div>
                </section >
            </div >
        </>
    )
}

export default Dashboard;