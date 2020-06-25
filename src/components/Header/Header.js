import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {

    return(
        <div className="header">
            <NavLink to={'./home'}>Home</NavLink>
            <NavLink to={'./settings'}>Settings</NavLink>               
        </div>
    )
}

export default Header;