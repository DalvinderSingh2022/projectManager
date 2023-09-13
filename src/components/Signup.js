import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { auth } from '../firebase';

const SignIn = ({ setOldUser }) => {
    const { setData } = useContext(AppContext);
    const [user, setUser] = useState({
        name: null,
        email: null,
        password: null,
        avatar: null
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
                updateProfile(auth.currentUser, { displayName: user.name, photoURL: user.avatar });
                localStorage.setItem('userToken', JSON.stringify(userInfo.user.accessToken));
                setData(prev => ({ ...prev, currentUser: userInfo.user }));
            })
            .catch(error => console.error(error));
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

    return (
        <section className='flex col gap'>
            <div>
                <h1>Welcome back</h1>
                <p>Welcome back! Please enter your details.</p>
            </div>
            <form className='flex col gap2'>
                <div className='flex col items-stretch w-full'>
                    <label htmlFor="avatar">Avatar</label>
                    <div className="avatars w-full flex j-start wrap">
                        {avatars.map((avatar, index) => <img onClick={(e) => handleAvatar(e)} src={avatar} alt={'avatar' + (index + 1)} key={index} />)}
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
                        placeholder='enter your password'
                        value={user.password || ''}
                        onChange={(e) => handlechange(e)} />
                </div>

                <div className='flex col items-stretch w-full submit'>
                    <button className="btn pri submit" onClick={(e) => handlesubmit(e)}>Sign Up</button>
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