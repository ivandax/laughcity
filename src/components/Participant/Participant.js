import React from 'react';

import './Participant.scss';

const Participant = ({participantName, order, deleteParticipant,usage}) => {

    return (
        <div className="participant">
            <div>{`${order} - ${participantName}`}</div>
            {usage==='delete' && <div className="cancel" onClick={deleteParticipant}>✖</div>}
        </div>
    )
}

export default Participant;