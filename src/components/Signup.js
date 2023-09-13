import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { auth } from '../firebase';
import { AppContext } from '../App';

const SignIn = ({ setOldUser }) => {
    const { setData } = useContext(AppContext);
    const [user, setUser] = useState({
        name: null,
        email: null,
        password: null
    });

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(userInfo => {
                localStorage.setItem('userToken', JSON.stringify(userInfo.user.accessToken));
                setData(prev => ({ ...prev, currentUser: userInfo }));
            });
    }

    return (
        <section className='flex col gap'>
            <div>
                <h1>Welcome back</h1>
                <p>Welcome back! Please enter your details.</p>
            </div>
            <form className='flex col gap2'>
                <div className='flex col items-stretch w-full'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id='name'
                        name='name'
                        placeholder='Enter your name'
                        value={user.name || ''}
                        onChange={(e) => handlechange(e)} />
                </div>
                <div className='flex col items-stretch w-full'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        placeholder='Enter your email'
                        value={user.email || ''}
                        onChange={(e) => handlechange(e)} />
                </div>
                <div className='flex col items-stretch w-full'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        placeholder='enter your password'
                        value={user.password || ''}
                        onChange={(e) => handlechange(e)} />
                </div>

                <div className='flex col items-stretch w-full submit'>
                    <button className="btn submit" onClick={(e) => handlesubmit(e)}>Sign Up</button>
                </div>

                <div className='change'>
                    Already have an account?
                    <button type='button' onClick={() => {
                        setOldUser(prev => !prev)
                        setUser({ name: null, email: null, password: null })
                    }}>Sign In</button>
                </div>
            </form>
        </section>
    )
}

export default SignIn;