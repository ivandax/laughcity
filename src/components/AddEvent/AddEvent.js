import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setUser } from '../../redux/userActions';

import FormInput from '../FormInput';
import Participant from '../Participant';

import { validateAll, arrayIntoList, makeIdentifier } from '../../helpers/helpers';
import { addItem, updateItemMerge } from '../../services/database';

import './AddEvent.scss';

const AddEvent = () => {

    const profile = useSelector(state=>state.user);
    const dispatch = useDispatch();

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
            await updateItemMerge('profiles', //updates the profile on database with the new event.
             {
                 events : [...profile.events, dataObject.identifier]
             }, 
             profile.id)
            const modProfile = {...profile, events: [...profile.events, dataObject.identifier]}
            dispatch(setUser(modProfile)) //updates the profile on redux with the new event.
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
                active: true,
                voters: [],
                identifier: makeIdentifier(profile.email, profile.id, profile.events.length)
            }
            setEvent(data);
        } else{
            setFormError(validated[1]);
        }
    }

    return (
        <div className="addEvent">
            <button onClick={()=>{formDisplay==="noShow" ? setFormDisplay('show') : setFormDisplay('noShow')}}>
                Create New
            </button>
            <form onSubmit={submitEvent} className={formDisplay}>
                <div className="formError">{formError}</div>
                <FormInput
                    placeholder="Title or Question" 
                    value={eventData.title}
                    onChange={value => setEventData({...eventData, title: value})}
                />
                <FormInput 
                    value={eventData.date}
                    type='date'
                    onChange={value => setEventData({...eventData, date: value})}
                />   
                <div className="participantBox">
                    <label>Vote Options</label>
                    <div>
                        <FormInput 
                            placeholder="Option" 
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
                    return <Participant key={person+index} order={index+1} participantName={person} deleteParticipant={deleteParticipant} usage="delete"></Participant>
                    })}
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    ) 
}

export default AddEvent;