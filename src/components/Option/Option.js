import React from 'react';

import './Option.scss';

const Option = ({participantName, order, setSelection, iAmChosen}) => {

    const handleSelect = () => {
        setSelection(participantName);
    }

    return(
        // i am chosen represents that the user has clicked on this option
        <div className={`option ${iAmChosen}`}>
            <div>{`${order} - ${participantName}`}</div>
            <button onClick={handleSelect}>✔</button>
        </div>        
    )
}

export default Option;