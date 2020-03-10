import React from 'react';

import EventList from '../EventList';

import './Spectator.scss';

const Spectator = ({view}) => {
    return (
        <div className={`spectator ${view}`}>
            <EventList userType="spectatorCard"/>
        </div>
    )
}

export default Spectator;

