import React from 'react';
import { Link } from 'react-router-dom';

import Brand from '../../components/Brand';

import './Lobby.scss';
import img from '../../images/options'

const Lobby = () => {
    return (
        <div className="lobby">
            <Brand />
            <p>Welcome. In this app you can <span>Create</span> a list of options for users to vote on.</p>
            <p>Or you can submit your <span className="vote">Vote</span> on someone's list</p>
            <p>At any moment you may toggle between Vote and Create</p>
            <Link to="/Home">Go to Home</Link>

        </div>
    )
}

export default Lobby;