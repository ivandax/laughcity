import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import FormInput from '../FormInput';
import Participant from '../Participant';

import { validateAll, arrayIntoList } from '../../helpers/helpers';
import { addItem } from '../../services/database';

import './AddEvent.scss';

const AddEvent = () => {

    const profile = useSelector(state=>state.user);

    const [eventData, setEventData] = useState(
        {
            title:'',
            date:'',
            type:'Favorite',
            participants: []
        }
    );
    const [formError, setFormError] = useState('');
    const [participant, setParticipant] = useState('');
    const [formDisplay, setFormDisplay] = useState('noShow')

    const deleteParticipant = (index) => {
        const {participants} = {...eventData};
        if(participants.length){
            participants.splice(index, 1);
            setEventData({...eventData, participants});
        }
    }

    const setEvent = async (dataObject) => {
        const result = await addItem('events', dataObject);
        if(result){
            console.log("event added!");
            setEventData({title:'',date:'',type:'Favorite',participants: []}); //resets form data
            setFormDisplay('noShow'); //hides the form until user wants to add more
        }
    }

    const submitEvent = (event) => {
        event.preventDefault();
        const validated = validateAll(eventData);
        if(validated===true){
            setFormError('');
            const data = {
                title: eventData.title,
                date: eventData.date,
                type: eventData.type,
                participants: arrayIntoList(eventData.participants, eventData.type),
                timestamp : +(new Date()),
                host: profile.id,
                hostName: profile.name,
                active: true
            }
            setEvent(data);
        } else{
            setFormError(validated[1]);
        }
    }

    return (
        <div className="addEvent">
            <button onClick={()=>{formDisplay==="noShow" ? setFormDisplay('show') : setFormDisplay('noShow')}}>
                New Event
            </button>
            <form onSubmit={submitEvent} className={formDisplay}>
                <div className="formError">{formError}</div>
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
                            {/* <option>Rank</option> */}
                        </select>                         
                    </div>              
                </div>
                <div className="participantBox">
                    <label>Participants</label>
                    <div>
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
                    return <Participant key={person+index} order={index+1} participantName={person} deleteParticipant={deleteParticipant}></Participant>
                    })}
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    ) 
}

export default AddEvent;