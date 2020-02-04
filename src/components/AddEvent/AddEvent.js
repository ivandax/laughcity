import React, { useState } from 'react';

import FormInput from '../FormInput';

import './AddEvent.scss';

const AddEvent = () => {

    const [eventData, setEventData] = useState(
        {
            title:'',
            date:'',
            type:'Favorite',
            participants: []
        }
    );

    const [participant, setParticipant] = useState('');

    const submitEvent = (event) => {
        event.preventDefault();
        console.log("trying to submit");
    }

    console.log(eventData)
    console.log(participant)

    return (
        <div className="addEvent">
            <button>
                New Event
            </button>
            <form onSubmit={submitEvent}>
                <FormInput
                    placeholder="Title"
                    value={eventData.title}
                    onChange={value => setEventData({...eventData, title: value})}
                />
                <div className="doubleBlock">
                    <div>
                        <label>Date</label>
                        <FormInput 
                            placeholder="Title" 
                            value={eventData.date}
                            type='date'
                            onChange={value => setEventData({...eventData, date: value})}
                        />                         
                    </div>
                    <div>
                        <label>Rank Type</label>
                        <select value={eventData.type} onChange={event => setEventData({...eventData, type: event.target.value})}>
                            <option>Favorite</option>
                            <option>Rank</option>
                        </select>                         
                    </div>              
                </div>
                <div className="participantBox">
                    <label>Participants</label>
                    <div>
                        {/* <FormInput 
                            placeholder="Participant's name" 
                            value={eventData.participants[eventData.participants.length]}
                            onChange={value => setEventData({...eventData, participants: buildArray(eventData.participants, value)})}
                        />
                        <button>Add</button>                         */}
                        <FormInput 
                            placeholder="Participant's name" 
                            value={participant}
                            onChange={value => setParticipant(value)}
                        />
                        <div className="add" onClick={()=>{
                            participant && setEventData({...eventData, participants : [...eventData.participants, participant]})
                            setParticipant('');
                            }}>Add</div>                        

                    </div>
                </div>
                <div className="displayNames">
                    {eventData.participants && eventData.participants.map( (person, index) => {
                    return <div className="personItem" key={person+index}>{`${index+1}) ${person}`}</div>
                    })}
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    ) 
}

export default AddEvent;