import React from 'react';
import { useSelector } from 'react-redux';

//import { getAllRealTime } from '../../services/database';

import VoteCard from '../VoteCard';

import './SearchResults.scss';

const SearchResults = ({events}) => {

    const profile = useSelector(state=>state.user);

    return (
        <div className="searchResults">
            {events.length ?
            events.map( (event) => {
                return <VoteCard key={event.timestamp+event.host} userType='spectatorCard' eventData={event} profileId={profile.id}/>
            })
            :
            <div className="noResults">
                <p>Welcome to Simple Survey!</p>
                <p>You can search for the <span className="vote">Most Recent</span> surveys to submit your vote</p>
                <p>Or</p>
                <p>If you know the <span className="vote">identifier</span>, search for a specific survey</p>
                <p>Or</p>
                <p>Go to tab <span>CREATE</span> to make your own survey</p>
            </div>
        }
        </div>
    )
}

export default SearchResults;