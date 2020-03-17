import React, { useState } from 'react';

import FormInput from '../FormInput';

import './Search.scss';

const Search = () => {

    const [searchString, setSearchString] = useState('');

    const onSearch = (event) => {
        event.preventDefault();
        console.log("submitted search of", searchString);
    }

    return(
        <form className="search" onSubmit={onSearch}>
            <FormInput 
                placeholder="Type your search" 
                value={searchString}
                onChange={value => setSearchString(value)}
            />
            <button type="submit">Search</button>            
        </form>
    )
}

export default Search;