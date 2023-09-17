import React, { createContext, useCallback, useEffect, useState } from 'react';
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

import '../src/style/Dashboard.css';
import '../src/style/Account.css';
import '../src/style/index.css';
import '../src/style/Users.css';
import '../src/style/Tasks.css';

import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';

export const AppContext = createContext();

const App = () => {
    const [currentUser, setcurrentUser] = useState(null);
    const [dbcomments, setdbcomments] = useState([]);
    const [dbUsers, setdbusers] = useState([]);
    const [dbTasks, setdbtasks] = useState([]);
    const [update, updatedb] = useState(false);

    const database = useCallback(async () => {
        localStorage.getItem("taskUser") ?
            setcurrentUser(JSON.parse(localStorage.getItem("taskUser"))) :
            onAuthStateChanged(auth, user => {
                setcurrentUser(user);
            });

        const dbtasks = [];
        const querytasks = await getDocs(collection(db, "tasks"));
        querytasks.forEach(task => {
            dbtasks.push(task.data());
        });
        setdbtasks(dbtasks)

        const dbusers = [];
        const queryusers = await getDocs(collection(db, "users"));
        queryusers.forEach(user => {
            dbusers.push(user.data());
        });
        setdbusers(dbusers)

        const dbcomments = [];
        const querycomments = await getDocs(collection(db, "comments"));
        querycomments.forEach(comment => {
            dbcomments.push(comment.data());
        });
        setdbcomments(dbcomments)
    }, [])

    useEffect(() => {
        database();
    }, [database, update]);

    return (
        <AppContext.Provider value={{ currentUser, setcurrentUser, dbTasks, dbUsers, dbcomments, updatedb }}>
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
        </AppContext.Provider >
    )
}

export default App;