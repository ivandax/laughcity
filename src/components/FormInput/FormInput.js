import React from 'react';

const FormInput = ({value,onChange,type="text",placeholder, maxLength='100', className}) => {
    return(
        <input 
            placeholder={placeholder}
            type={type} 
            value={value} 
            maxLength={maxLength}
            onChange={event=>onChange(event.target.value)}
            className={className}
        />
    )
}

export default FormInput;