import React, { useEffect, useRef, useState } from 'react';
import Task from '../components/Task';
import Loading from '../components/Loading';
import axios from 'axios';

const Tasks = () => {
    const [status, setStatus] = useState(null);
    const [tasks, setTasks] = useState([]);
    const btnsRef = useRef(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects${status ? `?status=${status}` : ""}`)
            .then(({ data: task }) => {
                setTasks(task);
            });

        const btns = btnsRef.current.querySelectorAll('button');
        const btnclick = (btn) => {
            btns.forEach(btn => btn.classList.remove('pri'))
            btn.classList.add('pri');
            setStatus(btn.getAttribute('data-value'));
        }
        btns.forEach(btn => btn.addEventListener('click', () => btnclick(btn)))

        return () => btns?.forEach(btn => btn.removeEventListener('click', () => btnclick(btn)));
    }, [status]);

    return (
        <aside className='tasks'>
            <div className="filters flex j-start gap" ref={btnsRef}>
                <button className="btn round flex gap2 pri" data-value={null}>All</button>
                <button className="btn round flex gap2 material-symbols-outlined" data-value={'completed'}>check_circle<span>Completed</span></button>
                <button className="btn round flex gap2 material-symbols-outlined" data-value={'pending'}>schedule<span>Pending</span></button>
            </div>
            <section className='flex gap wrap'>
                {tasks?.length > 0 ? tasks.map(task => <Task {...task} key={task._id} />) : (tasks?.length !== 0 ? <Loading /> : <div>There is no {status && `${status}`} task</div>)}
            </section>
        </aside>
    )
}

export default Tasks;