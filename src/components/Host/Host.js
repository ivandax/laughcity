import React from 'react';

import AddEvent from '../AddEvent';
import EventList from '../EventList';

import './Host.scss';

const Host = ({view}) => {
    return (
        <div className={`host ${view}`}>
            <AddEvent />
            <EventList userType="host"/>    
        </div>
    )
}

export default Host;