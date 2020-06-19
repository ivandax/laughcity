import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Brand from '../../components/Brand';

import './Lobby.scss';
import img from '../../images/options.JPG'

const Lobby = () => {

    const [isLoading, setIsLoading] = useState(true);

    if(isLoading) return <div>Loading...</div>

    return (
        <div className="lobby">
            <Brand />
            <p>Welcome. In this app you can <span>Create</span> a list of options for users to vote on.</p>
            <p>Or you can submit your <span className="vote">Vote</span> on someone's list</p>
            <img src={img} alt="options"/>
            <p>At any moment you may toggle between Vote and Create</p>
            <Link to="/Home">Continue</Link>

        </div>
    )
}

export default Lobby;