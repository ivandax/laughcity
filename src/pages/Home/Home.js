import React, { useEffect } from 'react';

import { logout, registerAuthObserver } from '../../services/auth';

import './Home.scss';

let cancelObserver;

const Home = ({history}) => {

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
        })

        return () => {
            cancelObserver();
        }
    }, [history]);

    return (
        <div>
            You're in!
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default Home;