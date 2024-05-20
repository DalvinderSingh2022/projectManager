import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AlertBox from '../components/AlertBox';
import axios from 'axios';

const Login = () => {
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
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
        axios.put("http://localhost:5000/api/users/login", user)
            .then(({ data: user }) => {
                setAlert({ message: 'Logged In successfully, Welcome back ' + user.name, type: 'verified' });
                setTimeout(() => navigate('/'), 2500);
            })
            .catch((error) => {
                console.error(error);
                setAlert({ message: error.response.data.message, type: 'report' });
            });
    }

    return (
        <>
            <div className="flex account full">
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
                                placeholder='Enter password'
                                value={user.password || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>

                        <div className="forgot flex j-end w-full">
                            <button type='button'><Link to='/reset'>forgot password?</Link></button>
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
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default Login;