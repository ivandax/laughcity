import React, { useState } from 'react';

import FormInput from '../../components/FormInput';
import Brand from '../../components/Brand';

import './Welcome.scss';

const Welcome = () => {

    const [display, setDisplay] = useState(['display','']);

    const toggleDisplay = () => {
        const currentDisplay = [...display];
        setDisplay([currentDisplay[1] , currentDisplay[0]]);
    }

    const handleSignIn = (event) => {
        event.preventDefault();
        console.log("attempted to login")
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        console.log("attempted to sign up")
    }

    return (
        <div className="welcome">
            <Brand />
            <form className={`signIn ${display[0]}`} onSubmit={handleSignIn}>
                <div>
                    <div>Sign In</div>
                    <div className="signUpLink" onClick={toggleDisplay}>Sign Up</div>      
                </div>
                <FormInput 
                    placeholder="Email" 
                    value=''
                    onChange={value => console.log("sign in email changed")}
                />
                <FormInput 
                    placeholder="Password" 
                    value=''
                    type='password'
                    onChange={value => console.log("sign in password changed")}
                />
                <button type="submit">Log In</button>
            </form>
            <form className={`signUp ${display[1]}`} onSubmit={handleSignUp}>
                <div>
                    <div className="signInLink" onClick={toggleDisplay}>Sign In</div>
                    <div>Sign Up</div>     
                </div>
                <FormInput 
                    placeholder="Name" 
                    value=''
                    onChange={value => console.log("signUp name changed")}
                />
                <FormInput 
                    placeholder="Email" 
                    value=''
                    onChange={value => console.log("signUp email changed")}
                />
                <FormInput 
                    placeholder="Password" 
                    value=''
                    type='password'
                    onChange={value => console.log("signUp password changed")}
                />
                <button type="submit">Sign Up</button>        
            </form>
        </div>
    )
}

export default Welcome;