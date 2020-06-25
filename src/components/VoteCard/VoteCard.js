import React, { useState, useEffect } from 'react';

import { deleteItem, updateItemMerge } from '../../services/database';
import { orderObject } from '../../helpers/helpers';

import Option from '../Option';

import './VoteCard.scss';

const VoteCard = ({eventData, userType, profileId}) => {

    const [choice, setChoice] = useState(''); //choice is blank at first...
    const [voted, setVoted] = useState(false); //events is originally unvoted the first time for a user.

    useEffect( () => { //checks if the event of this card has already been voted by the user.
        if(eventData['voters'].indexOf(profileId)>-1){
            setVoted(true);
        }
    }, [eventData, profileId])

    console.log("event data logging", eventData)

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
        <div className={`voteCard ${userType}`}>
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
                        return <Option key={elem[0]+elem[1]} order={elem[1]+1} participantName={elem[0]} setSelection={setSelection} iAmChosen={elem[0]===choice && 'chosen'} disabled={voted}/>
                    } )                    
                }
            </div>
            <div className="identifier">{`ID: ${eventData.identifier}`}</div>
            {
                <span className={`message ${eventData.active ? 'open' : "closed"}`}>{`This event is: ${eventData.active ? 'Open for Votes' : "Closed"}`}</span>
            }   
            {
                voted && <span className="message">Vote Submitted!</span>
            }           
            {   //only shows for spectator card
              <button className={``} onClick={saveChanges}>Submit</button>
            }
        </div>
    )
}

export default VoteCard;