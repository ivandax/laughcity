import React, { useState, useEffect } from 'react';

import { getAllRealTime } from '../../services/database';

import './EventList.scss';

const EventList = ({userType, profile}) => {

    const [events, setEvents] = useState([]);

    useEffect( () => {
        getAllRealTime({
            collection: 'events',
            filters: {field: 'host', condition: '==', value: profile.id},
            order: 'timestamp',
            callback: (collectionData) => {
                const results = [];
                collectionData.forEach( (document) => {
                    const data = document.data();
                    results.push(data);
                })
                setEvents(results);  
            }
        })

    }, [])

    return (
        <div className="eventList">
            List
        </div>
    )
}

export default EventList;