import React from 'react';

import { logout } from '../../services/auth';

import Header from  '../../components/Header';

import './Settings.scss';

const Settings = ({history}) => {

    const handleLogOut = () => {
        logout();
        history.push('/');
    }

    return (
        <div className="settings">
            <Header />
            <div>
                <button onClick={handleLogOut}>Log Out</button>  
            </div>
        </div>
    )
}

export default Settings;