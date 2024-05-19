import React, { useEffect, useState } from 'react';
import User from '../components/User';
import Loading from '../components/Loading';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users${value ? '?name=' + value : ""}`)
            .then(({ data: user }) => {
                setUsers(user);
            });
    }, [value]);

    return (
        <aside className='users'>
            <form className="filters flex gap2 items-stretch" onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='Enter user name...'
                    className='w-full'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type='button' onClick={() => setValue('')} className="btn round flex gap2 material-symbols-outlined">cancel<span>clear</span></button>
            </form>
            <section className='flex gap wrap items-stretch'>
                {users?.length > 0 ? users.map(user => <User {...user} key={user._id} />) : (users.length !== 0 ? <Loading /> : <div>Can't found {value}</div>)}
            </section>
        </aside>
    )
}

export default Users;