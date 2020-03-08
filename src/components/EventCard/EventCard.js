import React from 'react';

import Participant from '../Participant';

import './EventCard.scss';

const EventCard = ({eventData}) => {
    console.log(eventData)
    return (
        <div className="eventCard">
            <div className="title">
                <div>
                    <h3>{eventData.title}</h3>
                    <span> by {eventData.hostName}</span>
                </div>
                <div>{eventData.date}</div>
            </div>
            <div className="participants">
                {eventData.participants && Object.keys(eventData.participants).map( (name,index) => {
                    return <Participant key={name+index} order={index+1} participantName={name} deleteParticipant={()=>{return null}} usage="display"/>
                } )}
            </div>
        </div>
    )
}

export default EventCard;