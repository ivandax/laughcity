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
    const [loginError, setLoginError] = useState('');
    const [signUpError, setSignUpError] = useState('');
    //const [error, setError] = useState('');

    useEffect(()=>{
        if(cancelObserver) cancelObserver();
        //console.log("this happens")

        cancelObserver = registerAuthObserver(async(user)=>{
            if(user){
                console.log('user is', user);
                if(user.emailVerified){
                    const profile = await getItem('profiles', user.uid);
                    if(!profile){ //first time creation of the profile.
                        const result = await addItemWithId(
                            'profiles',
                            {
                                name: signUpData.name,
                                email: signUpData.email,
                                events: [],
                                homies: []
                            },
                            user.uid
                        );
                        result && history.push('/home');
                    } else{
                        history.push('/home'); //go straight to home if this is not the first login.
                    }
                } else{
                    setLoginData({...loginData, email: user.email})
                    setLoginError("User not verified. Please verify your email address.")
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
        setSignUpError('');
        
        const {name,email,password} = signUpData;

        if(!name || !email || !password){
            setSignUpError("All fields are required!");
        } else{
            signup(email, password);
            setSignUpError("Verification email sent!")
            setLoginData({email:email,password:''})
        }
    }

    const handleLogIn = async (event) => {
        event.preventDefault();
        setLoginError('');
        
        const {email,password} = loginData;

        if(!email || !password){
            setLoginError("All fields are required!");
        } else{
            const result = await login(email, password);
            if(result.message){
                //console.log(result);
                setLoginError(result.message);
            }else{
                history.push('/home');  
            }            
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
                {loginError && <div className="error">{loginError}</div>}
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
                {signUpError && <div className="error">{signUpError}</div>}     
            </form>
        </div>
    )
}

export default Welcome;