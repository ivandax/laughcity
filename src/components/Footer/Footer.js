import React from 'react';

import { logout } from '../../services/auth';

import './Footer.scss';

const Footer = ({history}) => {

    const handleLogOut = () => {
        logout();
        history.push('/');
    }

    return(
        <div className="footer">
            <button onClick={handleLogOut}>Log Out</button>                
        </div>
    )
}

export default Footer;