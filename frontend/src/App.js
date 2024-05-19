import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Edittask from './pages/Edittask';
import Register from './pages/Register';
import Notfound from './pages/Notfound';
import Login from './pages/Login';
import Users from './pages/Users';
import Tasks from './pages/Tasks';
import Reset from './pages/Reset';

import Layout from './components/Layout';

import './style/Dashboard.css';
import './style/Account.css';
import './style/index.css';
import './style/Users.css';
import './style/Tasks.css';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/reset' element={<Reset />} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='users' element={<Users />} />
                    <Route path='tasks' element={<Tasks />} />
                    <Route path='tasks/:id' element={<Edittask />} />
                </Route>
                <Route path='*' element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;