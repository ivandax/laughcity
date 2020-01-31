import React from 'react';

const FormInput = ({value,onChange,type="text",placeholder, maxLength='40',idstring=''}) => {
    return(
        <input 
            placeholder={placeholder}
            id={idstring}
            type={type} 
            value={value} 
            maxLength={maxLength}
            onChange={event=>onChange(event.target.value)} 
        />
    )
}

export default FormInput;