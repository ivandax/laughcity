import React, { useState, useEffect } from 'react';

import { deleteItem, updateItemMerge } from '../../services/database';
import { orderObject } from '../../helpers/helpers';

import Participant from '../Participant';
import Option from '../Option';

import './EventCard.scss';

const EventCard = ({eventData, userType, profileId}) => {

    const [display, setDisplay] = useState('noShow');
    const [choice, setChoice] = useState('');
    const [voted, setVoted] = useState(false);

    useEffect( () => { //checks if the event of this card has already been voted by the user.
        if(eventData['voters'].indexOf(profileId)>-1){
            setVoted(true);
        }
    }, [])

    const deleteEvent = async () => {
        const result = await deleteItem("events", eventData.eventId);
        result && console.log("event deleted");
    }

    const setSelection = (value) => {
        setChoice(value);
    }

    const saveChanges = async () => { //only submits once a choice has been made.
        if(choice && !voted){
            const newParticipants = {...eventData.participants};
            newParticipants[choice]['count'].push(profileId);
            await updateItemMerge('events', {participants : newParticipants}, eventData.eventId);
            const newVoters = [...eventData.voters, profileId];
            await updateItemMerge('events', {voters : newVoters}, eventData.eventId);
            setVoted(true);               
        }
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
                {
                    userType==="hostCard"
                    ?
                    eventData.participants && orderObject(eventData.participants).map( (elem) => {
                        return <Participant key={elem[0]+elem[1]} order={elem[1]+1} participantName={elem[0]} deleteParticipant={()=>{return null}} usage=""/>
                    } )
                    :
                    eventData.participants && orderObject(eventData.participants).map( (elem) => {
                        return <Option key={elem[0]+elem[1]} order={elem[1]+1} participantName={elem[0]} setSelection={setSelection} iAmChosen={elem[0]===choice && 'chosen'} disabled={voted}/>
                    } )                    
                }
            </div>
            {
                userType==='hostCard' && //only shows for host card
            <button onClick={()=>{display==='show' ? setDisplay('noShow') : setDisplay('show')}}>{display==='show' ? 'Sure about deleting?' : 'Delete'}</button> }
            {   userType==='hostCard' && (//only shows for host card
              <button className={`eventDelete ${display}`} onClick={deleteEvent}>Yeah, sure.</button>)
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