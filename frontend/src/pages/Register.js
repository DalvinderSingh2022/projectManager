import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AlertBox from '../components/AlertBox';
import axios from "axios";

const avatars = [
    'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=740',
    'https://img.freepik.com/premium-vector/senior-man-avatar-smiling-elderly-man-with-beard-with-gray-hair-3d-vector-people-character-illustration-cartoon-minimal-style_365941-810.jpg',
    'https://img.freepik.com/premium-vector/young-smiling-man-adam-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-687.jpg',
    'https://img.freepik.com/premium-vector/young-man-working-laptop-computer-having-idea-freelance-job-creativity-innovation-business-idea-concept-3d-vector-people-character-illustration-cartoon-minimal-style_365941-795.jpg',
    'https://img.freepik.com/premium-vector/happy-young-woman-watching-into-rounded-frame-isolated-white-illustration-render-style_365941-118.jpg',
    'https://img.freepik.com/premium-vector/young-smiling-woman-mia-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-792.jpg',
    'https://img.freepik.com/premium-vector/3d-vector-young-smiling-woman-with-light-sin-tone-brown-short-hair-user-avatar_624031-153.jpg',
    'https://img.freepik.com/premium-vector/young-smiling-woman-jane-peeking-out-looking-from-round-hole-searching-concept-3d-vector-people-character-illustrationcartoon-minimal-style_365941-739.jpg'
]

const SignIn = () => {
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: null,
        email: null,
        password: null,
        avatar: avatars[0],
    });

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/users/register", user)
            .then(({ data: user }) => {
                setAlert({ message: 'Registered successfully, Welcome ' + user.name, type: 'verified' });
                setTimeout(() => navigate('/'), 2500);
            })
            .catch((error) => {
                console.error(error);
                setAlert({ message: error.response.data.message, type: 'report' });
            });
    }

    const handleAvatar = (e) => {
        var index;
        e.target.parentElement.querySelectorAll('img').forEach((img, i) => {
            if (img.src === e.target.src) {
                img.classList.add('select');
                index = i;
            } else {
                img.classList.remove('select');
            }
        });
        setUser(prev => ({ ...prev, avatar: avatars[index] }));
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
                            <label htmlFor="avatar">Avatar</label>
                            <div className="avatars w-full flex j-start wrap">
                                {avatars.map((avatar, index) => <img onClick={(e) => handleAvatar(e)} src={avatar} alt={'avatar' + (index + 1)} key={index} loading='lazy' />)}
                            </div>
                        </div>
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
                                placeholder='Enter password'
                                value={user.password || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>

                        <div className='flex col items-stretch w-full submit'>
                            <button type='submit' className="btn pri submit">Register</button>
                        </div>

                        <div className='change'>
                            Already have an account?
                            <button type='button'><Link to='/login'>login</Link></button>
                        </div>
                    </form>
                </section>
            </div>
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default SignIn;