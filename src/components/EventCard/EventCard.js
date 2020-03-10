import React, { useState } from 'react';

import { deleteItem } from '../../services/database';
import { orderObject } from '../../helpers/helpers';

import Participant from '../Participant';

import './EventCard.scss';

const EventCard = ({eventData, userType}) => {

    const [display, setDisplay] = useState('noShow');

    const deleteEvent = async () => {
        const result = await deleteItem("events", eventData.eventId);
        result && console.log("event deleted");
    }

    const saveChanges = () => {
        console.log("trying to save");
    }

    console.log(eventData)

    return (
        <div className={`eventCard ${userType}`}>
            <div className="title">
                <div>
                    <h3>{eventData.title}</h3>
                    <span> by {eventData.hostName}</span>
                </div>
                <div>{eventData.date}</div>
            </div>
            <div className="participants">
                {eventData.participants && orderObject(eventData.participants).map( (elem) => {
                    return <Participant key={elem[0]+elem[1]} order={elem[1]+1} participantName={elem[0]} deleteParticipant={()=>{return null}} usage=""/>
                } )}
            </div>
            {
              userType==='hostCard' && //only shows for host card
            <button onClick={()=>{display==='show' ? setDisplay('noShow') : setDisplay('show')}}>{display==='show' ? 'Sure about deleting?' : 'Delete'}</button> }
            { userType==='hostCard' && (//only shows for host card
              <button className={`eventDelete ${display}`} onClick={deleteEvent}>Yeah, sure.</button>)
            }
            { userType==='spectatorCard' && (//only shows for spectator card
              <button className={``} onClick={saveChanges}>Save</button>)
            }
        </div>
    )
}

export default EventCard;