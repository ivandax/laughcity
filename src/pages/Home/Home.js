import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logout, registerAuthObserver } from '../../services/auth';
import { setUser } from '../../redux/userActions';
import { getItem } from '../../services/database';

import Host from '../../components/Host';
import Spectator from '../../components/Spectator';

import './Home.scss';

let cancelObserver;

const Home = ({history}) => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [mainView, setMainView] = useState('showSpectator');

    const handleLogOut = () => {
        logout();
        history.push('/');
    }

    useEffect(()=>{
        if(cancelObserver) cancelObserver();

        cancelObserver = registerAuthObserver(async(user)=>{
            if(!user){
                history.push('/');
            }
            else{
                setIsLoading(false);
                const profile = await getItem('profiles', user.uid);
                profile && dispatch(setUser(profile));
                console.log("logging profile",profile)
            }
        })

        return () => {
            cancelObserver();
        }
    }, [history]);

    if(isLoading) return <div>Loading...</div>

    return (
        <div className="home">
            <div className="homeOptions">
                <div className="specOption" onClick={()=>{setMainView('showSpectator')}}>
                    Spectator
                </div>
                <div className="hostOption" onClick={()=>{setMainView('showHost')}}>
                    Host
                </div>
            </div>
            <div className="main">
                <Spectator view={mainView}/>
                <Host view={mainView}/>
            </div>
            <div className="footer">
                <button onClick={handleLogOut}>Log Out</button>                
            </div>
        </div>
    )
}

export default Home;