import React from 'react';

import Search from '../Search';
import EventList from '../EventList';
import Footer from '../Footer';

import './Spectator.scss';

const Spectator = ({view, history}) => {
    return (
        <div className={`spectator ${view}`}>
            <Search />
            <EventList userType="spectatorCard"/>
            <Footer history={history} /> 
        </div>
    )
}

export default Spectator;

