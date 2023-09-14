import React, { useEffect, useState } from 'react';
import Edittask from '../components/Edittask';
import '../style/Dashboard.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const database = async () => {
            const dbTasks = [];
            const tasksSnapshot = await getDocs(collection(db, "tasks"));
            tasksSnapshot.forEach(task => {
                dbTasks.push(task.data().tasks[0])
            });
            setTasks(dbTasks);
        }
        database();
    }, []);

    return (
        <>
            <div className='statistics'>
                <div className="box flex col items-start">
                    <span className="title">Total Tasks</span>
                    <div className="stat">{tasks.length}</div>
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
                    <div className="heading">Add task</div>
                    <Edittask />
                </section>
                <section className='flex col j-start items-stretch gap2'>
                    <div className="heading">Tasks</div>
                    <div className="flex col tasks items-stretch">
                        {tasks && tasks.map(task => {
                            return (
                                <div className="task flex col items-start">
                                    <span className="title">{task.title}</span>
                                    <div className="due">{task.duedate}</div>
                                </div>);
                        })}
                    </div>
                </section >
            </div >
        </>
    )
}

export default Dashboard;