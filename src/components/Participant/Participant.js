import React from 'react';

import './Participant.scss';

const Participant = ({participantName, order, deleteParticipant}) => {

    return (
        <div className="participant">
            <div>{`${order} - ${participantName}`}</div>
            <div className="cancel" onClick={deleteParticipant}>✖</div>
        </div>
    )
}

export default Participant;