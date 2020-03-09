import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getAllRealTime } from '../../services/database';

import EventCard from '../EventCard';

import './EventList.scss';

const EventList = ({userType}) => {

    const profile = useSelector(state=>state.user);
    const [events, setEvents] = useState([]);

    useEffect( () => {
        ( profile && profile.id ) && getAllRealTime({
            collection: 'events',
            filters: {field: 'host', condition: '==', value: profile.id},
            order: 'timestamp',
            callback: (collectionData) => {
                const results = [];
                collectionData.forEach( (document) => {
                    const data = document.data();
                    data['eventId'] = document.id;
                    results.push(data);
                })
                setEvents(results);  
            }
        })

    }, [profile])

    return (
        <div className="eventList">
            {events && 
            events.map( (event) => {
                return <EventCard key={event.timestamp+event.host} eventData={event}/>
            })}
        </div>
    )
}

export default EventList;