import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

//import { getAllRealTime } from '../../services/database';

import EventCard from '../EventCard';

import './SearchResults.scss';

const SearchResults = ({events}) => {

    const profile = useSelector(state=>state.user);

    return (
        <div className="searchResults">
            {events.length ?
            events.map( (event) => {
                return <EventCard key={event.timestamp+event.host} userType='spectatorCard' eventData={event} profileId={profile.id}/>
            })
            :
            <div className="noResults">Search results will display here.</div>
        }
        </div>
    )
}

export default SearchResults;