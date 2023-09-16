import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import User from '../components/User';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        const database = async () => {
            const dbUsers = [];
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach(user => {
                dbUsers.push(user.data());
            });

            setUsers(dbUsers.filter(a => {
                const name = a?.displayName.toLowerCase().replaceAll(" ", "");
                const search = value.toLowerCase().replaceAll(" ", "");
                return name.includes(search);
            }));
        }
        database();
    }, [value]);

    return (
        <div className="users">
            <form className="search flex j-start gap2 items-stretch" onSubmit={e => e.preventDefault()}>
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
                {users.map(user => <User {...user} key={user.uid} />)}
            </section>
        </div>
    )
}

export default Users
