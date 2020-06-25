import React from 'react';

import AddEvent from '../AddEvent';
import EventList from '../EventList';
//import Footer from '../Footer';

import './Host.scss';

const Host = ({view, history}) => {
    return (
        <div className={`host ${view}`}>
            <AddEvent />
            <EventList userType="hostCard"/>
            {/* <Footer history={history}/>    */}
        </div>
    )
}

export default Host;