import React, { useState, useEffect } from 'react';

import { deleteItem, updateItemMerge } from '../../services/database';
import { orderObject } from '../../helpers/helpers';

import Participant from '../Participant';
import Option from '../Option';

import './EventCard.scss';

const EventCard = ({eventData, userType, profileId}) => {

    const [display, setDisplay] = useState('noShow'); //we don't show the delete button right away
    const [choice, setChoice] = useState(''); //choice is blank at first...
    const [voted, setVoted] = useState(false); //events is originally unvoted the first time for a user.

    useEffect( () => { //checks if the event of this card has already been voted by the user.
        if(eventData['voters'].indexOf(profileId)>-1){
            setVoted(true);
        }
    }, [eventData, profileId])

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

    const setSelection = (value) => {
        setChoice(value);
    }

    const saveChanges = async () => { //only submits once choice is made, vote is not yet submitted and event is open
        if(choice && !voted && eventData.active){
            const newParticipants = {...eventData.participants};
            newParticipants[choice]['count'].push(profileId);
            await updateItemMerge('events', {participants : newParticipants}, eventData.eventId);
            const newVoters = [...eventData.voters, profileId];
            await updateItemMerge('events', {voters : newVoters}, eventData.eventId);
            setVoted(true);               
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
                <div>{eventData.date}</div>
            </div>
            <div className="participants">
                {
                    userType==="hostCard"
                    ?
                    eventData.participants && orderObject(eventData.participants).map( (elem) => {
                        return <Participant key={elem[0]+elem[1]} order={elem[1]+1} participantName={elem[0]} deleteParticipant={()=>{return null}} usage="display" tally={elem[2].length}/>
                    } )
                    :
                    eventData.participants && orderObject(eventData.participants).map( (elem) => {
                        return <Option key={elem[0]+elem[1]} order={elem[1]+1} participantName={elem[0]} setSelection={setSelection} iAmChosen={elem[0]===choice && 'chosen'} disabled={voted}/>
                    } )                    
                }
            </div>
            {   userType==='hostCard' && (//only shows for host card
              <button className="eventClose" onClick={changeEventStatus}>{eventData.active ? 'Close Event' : "Re-Open"}</button>)
            }
            {
                userType==='hostCard' && //only shows for host card
            <button onClick={()=>{display==='show' ? setDisplay('noShow') : setDisplay('show')}}>{display==='show' ? 'Sure about deleting?' : 'Delete'}</button> }
            {   userType==='hostCard' && (//only shows for host card
              <button className={`eventDelete ${display}`} onClick={deleteEvent}>Yeah, sure.</button>)
            }
            {
                <span className="message">{`This event is: ${eventData.active ? 'Open for Votes' : "Closed"}`}</span>
            }   
            {
                (userType==='spectatorCard' && voted) && <span className="message">Vote Submitted!</span>
            }           
            {   userType==='spectatorCard' && (//only shows for spectator card
              <button className={``} onClick={saveChanges}>Submit</button>)
            }
        </div>
    )
}

export default EventCard;