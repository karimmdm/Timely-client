import React , { useContext } from 'react';
import {useGoogleLogin} from 'react-google-login';
import { refreshTokenSetup} from '../utils/refreshToken';

import {Button, Icon} from 'rsuite';
import "../styles/Landing.css";

import { AuthContext } from '../utils/AuthContext';
import { useHistory } from 'react-router-dom';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const apiUrl = process.env.REACT_APP_BASE_URL;
const homeUrl = process.env.REACT_APP_HOME_URL + "/";

export default function SigninWithGoogle(){
    const history = useHistory();
    const {setUser} = useContext(AuthContext);

    const onSuccess = async googleData =>{
        // console.log(googleData);
        //send token to server to authorise
        const res = await fetch(apiUrl+'/api/auth/google', {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        const data = await res.json();
        // console.log(data);
        //store returned user
        setUser(data);
        // console.log("user", res.profileObj);
        // might not need this refresh token but ill keep it for now
        refreshTokenSetup(googleData); 
        history.push('/dashboard');
        localStorage.setItem("signedIn", true);
    }
    
    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    }

    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
        cookiePolicy: 'single_host_origin'
    });
    
    return ( 
        <div>
            {
                (localStorage.getItem('signedIn') === 'false' || window.location.href === homeUrl) ? 
                <Button id="loginButton" onClick={signIn} appearance="primary" style={{backgroundColor:"#e8594f"}}>
                    <Icon icon="google" /> Sign in with Google
                </Button> : <div></div> 
            }
            
        </div>
        
    );
}
 
