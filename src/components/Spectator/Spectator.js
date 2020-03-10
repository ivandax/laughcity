import React from 'react';

import EventList from '../EventList';
import Footer from '../Footer';

import './Spectator.scss';

const Spectator = ({view, history}) => {
    return (
        <div className={`spectator ${view}`}>
            <EventList userType="spectatorCard"/>
            <Footer history={history} /> 
        </div>
    )
}

export default Spectator;

