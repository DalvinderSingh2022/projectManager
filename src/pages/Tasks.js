import React, { useContext, useEffect, useRef, useState } from 'react'
import Task from '../components/Task';
import { AppContext } from '../App';
import Loading from '../components/Loading';

const Tasks = () => {
    const { dbTasks } = useContext(AppContext);
    const [status, setStatus] = useState(null);
    const [tasks, setTasks] = useState([]);
    const btnsRef = useRef(null);

    useEffect(() => {
        setTasks(status ? (dbTasks.filter(a => a.status === status) || []) : dbTasks);

        const btns = btnsRef.current.querySelectorAll('button');
        const btnclick = (btn) => {
            btns.forEach(btn => btn.classList.remove('pri'))
            btn.classList.add('pri');
            setStatus(btn.getAttribute('data-value'));
        }
        btns.forEach(btn => btn.addEventListener('click', () => btnclick(btn)))

        return () => btns?.forEach(btn => btn.removeEventListener('click', () => btnclick(btn)));
    }, [status, dbTasks]);


    return (
        <aside className='tasks'>
            <div className="filters flex j-start gap" ref={btnsRef}>
                <button className="btn round flex gap2 pri" data-value={null}>All</button>
                <button className="btn round flex gap2 material-symbols-outlined" data-value={'completed'}>check_circle<span>Completed</span></button>
                <button className="btn round flex gap2 material-symbols-outlined" data-value={'pending'}>schedule<span>Pending</span></button>
            </div>
            <section className='flex gap wrap'>
                {tasks?.length ? tasks.map(task => task ? <Task {...task} key={task.uid} /> : <Loading />) : <div>There is no {status && `${status}`} task</div>}
            </section>
        </aside>
    )
}

export default Tasks
