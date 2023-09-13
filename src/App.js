import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Account from '../src/pages/Account';

import '../src/style/index.css';
import '../src/style/Account.css';

import { getAuth } from 'firebase/auth';

export const AppContext = createContext();

const App = () => {
    const [data, setData] = useState({
        currentUser: getAuth().currentUser?.user,
    });

    return (
        <AppContext.Provider value={{ data, setData }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/account' element={<Account />} />
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App;