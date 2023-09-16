import React, { useContext, useEffect, useState } from 'react';
import User from '../components/User';
import { AppContext } from '../App';

const Users = () => {
    const { dbUsers } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        setUsers(dbUsers.filter(a => {
            const name = a?.displayName.toLowerCase().replaceAll(" ", "");
            const search = value.toLowerCase().replaceAll(" ", "");
            return name.includes(search);
        }));
    }, [value, dbUsers]);

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
                <button type='button' onClick={(e) => { setValue('') }} className="btn round flex gap2 material-symbols-outlined">cancel<span>clear</span></button>
            </form>
            <section className='flex gap wrap'>
                {users?.length ? users.map(user => <User {...user} key={user.uid} />) : <div>Can't found {value}</div>}
            </section>
        </aside>
    )
}

export default Users
