import React, { useState } from 'react';

import { deleteItem, updateItemMerge } from '../../services/database';
import { orderObject } from '../../helpers/helpers';

import Participant from '../Participant';

import './EventCard.scss';

const EventCard = ({eventData, userType, profileId}) => {

    const [display, setDisplay] = useState('noShow'); //we don't show the delete button right away
    //const [choice, setChoice] = useState(''); //choice is blank at first...
    // const [voted, setVoted] = useState(false); //events is originally unvoted the first time for a user.

    // useEffect( () => { //checks if the event of this card has already been voted by the user.
    //     if(eventData['voters'].indexOf(profileId)>-1){
    //         setVoted(true);
    //     }
    // }, [eventData, profileId])

    const deleteEvent = async () => {
        const result = await deleteItem("events", eventData.eventId);
        result && console.log("event deleted");
    }

    const changeEventStatus = async () => {
        if(eventData.active){
            await updateItemMerge('events', {active : false}, eventData.eventId); 
        } else{
            await updateItemMerge('events', {active : true}, eventData.eventId);
        }    
    }

    //console.log(eventData)
    return (
        <div className={`eventCard ${userType}`}>
            <div className="title">
                <div>
                    <h3>{eventData.title}</h3>
                    <span> by {eventData.hostName}</span>
                </div>
                <div className="date">{eventData.date}</div>
            </div>
            <div className="participants">
                {
                    eventData.participants && orderObject(eventData.participants).map( (elem) => {
                        return <Participant key={elem[0]+elem[1]} order={elem[1]+1} participantName={elem[0]} deleteParticipant={()=>{return null}} usage="display" tally={elem[2].length}/>
                    } )                
                }
            </div>
            <div className="identifier">{`ID: ${eventData.identifier}`}</div>
            {
              <button className="eventClose" onClick={changeEventStatus}>{eventData.active ? 'Close Event' : "Re-Open"}</button>
            }
            {
            <button onClick={()=>{display==='show' ? setDisplay('noShow') : setDisplay('show')}}>{display==='show' ? 'Sure about deleting?' : 'Delete'}</button> }
            {
              <button className={`eventDelete ${display}`} onClick={deleteEvent}>Yeah, sure.</button>
            }
            {
                <span className={`message ${eventData.active ? 'open' : "closed"}`}>{`This event is: ${eventData.active ? 'Open for Votes' : "Closed"}`}</span>
            }
        </div>
    )
}

export default EventCard;