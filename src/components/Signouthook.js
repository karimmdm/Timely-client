import React, { useContext } from 'react';
import {useGoogleLogout} from 'react-google-login';

import {IconButton, Icon, Whisper, Tooltip} from 'rsuite';
import "../styles/Landing.css";
import "../styles/Dashboard.css";
import { AuthContext } from '../utils/AuthContext';
import { useHistory } from 'react-router-dom';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const apiUrl = process.env.REACT_APP_BASE_URL;

export default function SignOut(){
    const history = useHistory();
    const {setUser}  = useContext(AuthContext);

    const onLogoutSuccess = async (res) =>{
        setUser(null);
        const logout = await fetch(apiUrl+'/api/auth/logout', {
            method: 'DELETE'
        });
        const data = await logout.json();
        if(logout.ok && data){
            localStorage.setItem("signedIn", false);
            history.push('/');
        }
    }
    
    const onFailure = (res) => {
        console.log('Handle failure cases');
    }

    const {signOut} = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    });
    
    const signoutTip = (
        <Tooltip>
            Sign out
        </Tooltip>
    );
    
    return ( 
        <Whisper placement="right" trigger="hover" speaker={signoutTip}>
            <IconButton size='lg' className = "iconbuttons" onClick={signOut}  icon={<Icon icon="sign-out" />} circle/>
        </Whisper>
    );
}
 
