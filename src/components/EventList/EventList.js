import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getAllRealTime } from '../../services/database';

import EventCard from '../EventCard';

import './EventList.scss';

const EventList = ({userType}) => {

    const profile = useSelector(state=>state.user);
    const [events, setEvents] = useState([]);

    useEffect( () => {
        if( profile && profile.id ) { //this condition to make sure redux state already has the set user
            const queries = {
                'hostCard' : {field: 'host', condition: '==', value: profile.id}, //if displaying host...
                'spectatorCard' : {field: 'timestamp', condition: '>', value: 0} //display all for spectator
            }
            const limits = {
                'hostCard' : 100, //show 100 events
                'spectatorCard' :  20 //max 20 events for spectator
            }
            getAllRealTime({
                collection: 'events',
                filters: queries[userType],
                order: 'timestamp',
                limit: limits[userType],
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
        }

    }, [profile, userType])

    return (
        <div className="eventList">
            {events && 
            events.map( (event) => {
                return <EventCard key={event.timestamp+event.host} eventData={event} userType={userType} profileId={profile.id}/>
            })}
        </div>
    )
}

export default EventList;