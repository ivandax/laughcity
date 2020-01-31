import React, { useState } from 'react';

import FormInput from '../FormInput';

import './AddEvent.scss';

const AddEvent = () => {

    const [eventData, setEventData] = useState(
        {
            title:'',
            location:'',
            date:'',
            type:'favorite',
            category: 'comedy',
            participants: []
        }
    );

    const submitEvent = (event) => {
        event.preventDefault();
        console.log("trying to submit");
    }

    console.log(eventData)

    return (
        <div className="addEvent">
            <button>
                New Event
            </button>
            <form onSubmit={submitEvent}>
                <FormInput
                    className="titleInput"
                    placeholder="Title"
                    idstring='titleInput'
                    value={eventData.title}
                    onChange={value => setEventData({...eventData, title: value})}
                />
                <div className="doubleBlock">
                    <div>
                        <label>Date</label>
                        <FormInput 
                            placeholder="Title" 
                            value={eventData.title}
                            type='date'
                            onChange={value => setEventData({...eventData, title: value})}
                        />                         
                    </div>
                    <div>
                        <label>Rank Type</label>
                        <select>
                            <option>Favorite</option>
                            <option>Rank</option>
                        </select>                         
                    </div>              
                </div>
            </form>
        </div>
    ) 
}

export default AddEvent;