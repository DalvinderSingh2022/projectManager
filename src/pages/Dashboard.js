import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../App';


const Dashboard = () => {
    const { data } = useContext(AppContext);

    if (!data.currentUser) {
        return <Navigate to='/account' />;
    }

    return (
        <div>
            dashboard
        </div>
    )
}

export default Dashboard;