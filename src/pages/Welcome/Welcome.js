import React, { useState } from 'react';

import { signup } from '../../services/auth';

import FormInput from '../../components/FormInput';
import Brand from '../../components/Brand';

import './Welcome.scss';

const Welcome = ({history}) => {

    const [display, setDisplay] = useState(['display','']);
    const [loginData, setLoginData] = useState({email:'',password:''});
    const [signUpData, setSignUpData] = useState({name:'',email:'',password:''});
    const [error, setError] = useState('');

    const toggleDisplay = () => {
        const currentDisplay = [...display];
        setDisplay([currentDisplay[1] , currentDisplay[0]]);
    }

    const handleLogIn = (event) => {
        event.preventDefault();
        console.log("attempted to login")
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        setError('');
        
        const {name,email,password} = signUpData;
        console.log(name,email,password);

        if(!name || !email || !password){
            setError("All fields are required!");
        } else{
            signup(email, password)
        }
    }

    return (
        <div className="welcome">
            <Brand />
            <form className={`signIn ${display[0]}`} onSubmit={handleLogIn}>
                <div>
                    <div>Sign In</div>
                    <div className="signUpLink" onClick={toggleDisplay}>Sign Up</div>      
                </div>
                <FormInput 
                    placeholder="Email" 
                    value={loginData.email}
                    onChange={value => setLoginData({...loginData, email: value})}
                />
                <FormInput 
                    placeholder="Password" 
                    value={loginData.password}
                    type='password'
                    onChange={value => setLoginData({...loginData, password: value})}
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
                    value={signUpData.name}
                    onChange={value => setSignUpData({...signUpData, name: value})}
                />
                <FormInput 
                    placeholder="Email" 
                    value={signUpData.email}
                    onChange={value => setSignUpData({...signUpData, email: value})}
                />
                <FormInput 
                    placeholder="Password" 
                    value={signUpData.password}
                    type='password'
                    onChange={value => setSignUpData({...signUpData, password: value})}
                />
                <button type="submit">Sign Up</button>  
                {error && <div>{error}</div>}      
            </form>
        </div>
    )
}

export default Welcome;