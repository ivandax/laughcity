import React, { useState } from 'react';

import Search from '../Search';
//import EventList from '../EventList';
import SearchResults from '../SearchResults';
//import Footer from '../Footer';

import './Spectator.scss';

const Spectator = ({view, history}) => {

    const [events, setEvents] = useState([]);

    const getEvents = (object) => {
        setEvents(object)
    }

    return (
        <div className={`spectator ${view}`}>
            <Search getEvents={getEvents}/>
            {/* <EventList userType="spectatorCard"/> */}
            <SearchResults events={events}/>
            {/* <Footer history={history} />  */}
        </div>
    )
}

export default Spectator;

