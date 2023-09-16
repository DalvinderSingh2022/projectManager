import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Layout from './components/Layout';

import '../src/style/index.css';
import '../src/style/Account.css';
import '../src/style/Dashboard.css';
import '../src/style/Users.css';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export const AppContext = createContext();

const App = () => {
    const [currentUser, setcurrentUser] = useState(null);

    useEffect(() => {
        const database = onAuthStateChanged(auth, user => {
            setcurrentUser(user);
        });
        database();
    }, [])

    return (
        <AppContext.Provider value={{ currentUser, setcurrentUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path='users' element={<Users />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider >
    )
}

export default App;