import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import Task from '../components/Task';

const Tasks = () => {
    const [status, setStatus] = useState(null);
    const [tasks, setTasks] = useState([]);
    const btnsRef = useRef(null);

    useEffect(() => {
        const database = async () => {
            const dbTasks = [];
            const querySnapshot = await getDocs(collection(db, "tasks"));
            querySnapshot.forEach(task => {
                dbTasks.push(task.data());
            });
            setTasks(status ? (dbTasks.filter(a => a.status === status) || []) : dbTasks)
        }
        database();

        const btns = btnsRef.current.querySelectorAll('button');
        const btnclick = (btn) => {
            btns.forEach(btn => btn.classList.remove('active'))
            btn.classList.add('active');
            setStatus(btn.getAttribute('data-value'));
        }
        btns.forEach(btn => btn.addEventListener('click', () => btnclick(btn)))

        return () => btns?.forEach(btn => btn.removeEventListener('click', () => btnclick(btn)));
    }, [status])


    return (
        <aside className='tasks'>
            <div className="filters flex j-start gap" ref={btnsRef}>
                <button className="btn round flex gap2 active" data-value={null}>All</button>
                <button className="btn round flex gap2 material-symbols-outlined" data-value={'completed'}>check_circle<span>Completed</span></button>
                <button className="btn round flex gap2 material-symbols-outlined" data-value={'pending'}>schedule<span>Pending</span></button>
            </div>
            <section className='flex gap wrap j-start'>
                {tasks && tasks.map(task => <Task {...task} key={task.uid} />)}
            </section>
        </aside>
    )
}

export default Tasks
