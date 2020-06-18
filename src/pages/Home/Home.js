import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { registerAuthObserver } from '../../services/auth';
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

    useEffect(()=>{
        if(cancelObserver) cancelObserver();

        cancelObserver = registerAuthObserver(async(user)=>{
            if(!user || !user.emailVerified){
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
    }, [history, dispatch]);

    if(isLoading) return <div>Loading...</div>

    return (
        <div className="home">
            <div className="homeOptions">
                <div className="specOption" onClick={()=>{setMainView('showSpectator')}}>
                    Vote
                </div>
                <div className="hostOption" onClick={()=>{setMainView('showHost')}}>
                    Create
                </div>
            </div>
            <div className="main">
                <Spectator view={mainView} history={history}/>
                <Host view={mainView} history={history}/>
            </div>
        </div>
    )
}

export default Home;