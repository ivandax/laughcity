import React from 'react';

import AddEvent from '../AddEvent';
import EventList from '../EventList';

import './Host.scss';

const Host = () => {
    return (
        <div className="host">
            <AddEvent />
            <EventList userType="host"/>    
        </div>
    )
}

export default Host;