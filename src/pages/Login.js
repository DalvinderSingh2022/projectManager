import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useContext } from 'react';
import { auth } from '../firebase';
import { AppContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import AlertBox from '../components/AlertBox';

const Login = () => {
    const { setcurrentUser } = useContext(AppContext);
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
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(userInfo => {
                localStorage.setItem("taskUser", JSON.stringify(userInfo));
                setAlert({ message: 'Logged In successfully, Welcome back ' + userInfo.user.displayName, type: 'verified' });
                setTimeout(() => {
                    setcurrentUser(userInfo);
                    navigate('/');
                }, 2500);
            })
            .catch(error => {
                setAlert({ message: error.message, type: 'report' });
                console.error(error);
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