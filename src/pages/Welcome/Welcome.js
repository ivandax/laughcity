import React, { useState, useEffect } from 'react';

import { signup, login, registerAuthObserver } from '../../services/auth';
import { addItemWithId, getItem } from '../../services/database';

import FormInput from '../../components/FormInput';
import Brand from '../../components/Brand';

import './Welcome.scss';

let cancelObserver;

const Welcome = ({history}) => {

    const [display, setDisplay] = useState(['display','']);
    const [loginData, setLoginData] = useState({email:'',password:''});
    const [signUpData, setSignUpData] = useState({name:'',email:'',password:''});
    const [error, setError] = useState('');
    const [emailNotification, setEmailNotification] = useState('');

    useEffect(()=>{
        if(cancelObserver) cancelObserver();

        cancelObserver = registerAuthObserver(async(user)=>{
            if(user){
                console.log('user is', user);
                if(user.emailVerified){
                    const profile = await getItem('profiles', user.uid);
                    if(!profile){
                        const result = await addItemWithId(
                            'profiles',
                            {
                                name: signUpData.name,
                                email: signUpData.email,
                                eventNames: [],
                                homiesNames: []
                            },
                            user.uid
                        );
                        result && history.push('/home');
                    } else{
                        history.push('/home');
                    }
                }
            }
            else{
                console.log("no user logged")
            }
        })

        return () => {
            cancelObserver();
        }
    }, [history, signUpData.email, signUpData.name]);

    const toggleDisplay = () => {
        const currentDisplay = [...display];
        setDisplay([currentDisplay[1] , currentDisplay[0]]);
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        setError('');
        
        const {name,email,password} = signUpData;

        if(!name || !email || !password){
            setError("All fields are required!");
        } else{
            signup(email, password);
            setEmailNotification("Verification email sent!")
            setLoginData({email:email,password:''})
        }
    }

    const handleLogIn = (event) => {
        event.preventDefault();
        setError('');
        
        const {email,password} = loginData;

        if(!email || !password){
            setError("All fields are required!");
        } else{
            login(email, password);
            history.push('/');
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
                {emailNotification && <div className="verification">{emailNotification}</div>}       
            </form>
        </div>
    )
}

export default Welcome;