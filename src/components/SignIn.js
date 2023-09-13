import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useContext } from 'react';
import { auth } from '../firebase';
import { AppContext } from '../App';

const Signup = ({ setOldUser }) => {
    const { setData } = useContext(AppContext);
    const [user, setUser] = useState({
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
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(userInfo => {
                localStorage.setItem('userToken', JSON.stringify(userInfo.user.accessToken));
                setData(prev => ({ ...prev, currentUser: userInfo.user }));
            })
            .catch(error => console.error(error));;
    }

    return (
        <section className='flex col gap'>
            <div>
                <h1>Welcome back</h1>
                <p>Welcome back! Please enter your details.</p>
            </div>
            <form className='flex col gap2'>
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
                    <button className="btn pri submit" onClick={(e) => handlesubmit(e)}>Sign In</button>
                </div>

                <div className='change'>
                    Don’t have an account?
                    <button type='button' onClick={() => {
                        setOldUser(prev => !prev)
                        setUser({ name: null, email: null, password: null })
                    }}>Sign Up</button>
                </div>
            </form>
        </section>
    )
}

export default Signup;