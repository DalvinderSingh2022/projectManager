import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useContext } from 'react';
import { auth } from '../firebase';
import { AppContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Account.css';

const Login = () => {
    const navigate = useNavigate();
    const { setcurrentUser } = useContext(AppContext);
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
                setcurrentUser(userInfo);
                navigate('/');
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="flex account">
            <section className='flex col gap'>
                <div>
                    <h1>Welcome back</h1>
                    <p>Welcome back! Please enter your details.</p>
                </div>
                <form className='flex col gap2' onSubmit={(e) => handlesubmit(e)}>
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
                        <button type='submit' className="btn pri submit">Log In</button>
                    </div>

                    <div className='change'>
                        Don’t have an account?
                        <button type='button'><Link to='/register'>register</Link></button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Login;