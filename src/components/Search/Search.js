import React, { useState } from 'react';

import { getAllRealTime, getItem } from '../../services/database';

import FormInput from '../FormInput';

import './Search.scss';

const Search = ({getEvents}) => {

    const [searchString, setSearchString] = useState('');
    const [searchType, setSearchType] = useState("Most Recent");

    const onSearch = async (event) => {
        event.preventDefault();
        if(searchType==="Most Recent"){
            getAllRealTime({
                collection: 'events',
                filters: {field: 'timestamp', condition: '>', value: 0},
                order: 'timestamp',
                limit: 10,
                callback: (collectionData) => {
                    const results = [];
                    collectionData.forEach( (document) => {
                        const data = document.data();
                        data['eventId'] = document.id;
                        results.push(data);
                    })
                    getEvents(results);  
                }
            })
        }else if(searchString){ //in case user wants to search by identifier
            getAllRealTime({
                collection: 'events',
                filters: {field: 'identifier', condition: '==', value: searchString},
                order: 'timestamp',
                limit: 1,
                callback: (collectionData) => {
                    const results = [];
                    collectionData.forEach( (document) => {
                        const data = document.data();
                        data['eventId'] = document.id;
                        results.push(data);
                    })
                    getEvents(results); 
                }
            })
        }
    }

    return(
        <form className="search" onSubmit={onSearch}>
            <select value={searchType} onChange={event => setSearchType(event.target.value)}>
                <option>Most Recent</option>
                <option>By identifier</option>
            </select>  
            <button type="submit">Search</button>
            <FormInput 
                placeholder="Type your search" 
                value={searchString}
                onChange={value => setSearchString(value)}
                className={searchType==="Most Recent" ? 'noView' : ''}
            />         
        </form>
    )
}

export default Search;