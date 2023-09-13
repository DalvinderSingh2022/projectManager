import React, { useState, useContext } from 'react';
import SignIn from '../components/SignIn';
import Signup from '../components/Signup';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../App';

const Account = () => {
    const { data } = useContext(AppContext);
    const [oldUser, setOldUser] = useState(false);

    if (data.currentUser) {
        return <Navigate to='/' />;
    }

    return (
        <div className='account flex'>
            {oldUser ? <SignIn setOldUser={setOldUser} /> :
                <Signup setOldUser={setOldUser} />}
        </div>
    )
}

export default Account;