import React from 'react';
import { useSelector } from 'react-redux';

import AddEvent from '../AddEvent';
import EventList from '../EventList';

import './Host.scss';

const Host = () => {

    const profile = useSelector(state=>state.user);
    console.log("profile", profile)

    return (
        <div className="host">
            <AddEvent />
            <EventList userType="host" profile={profile}/>    
        </div>
    )
}

export default Host;