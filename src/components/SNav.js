import React, { useEffect, useState } from 'react';
import {Icon, Tooltip, Whisper, IconButton} from 'rsuite';
import logo from '../images/logo.svg';
import SignOut from '../components/Signouthook';

export default function SNav(){
    const[signoutcomp, setsignoutcomp] = useState(<div></div>);
    const userTip = (
        <Tooltip>
            Account Settings
        </Tooltip>
    );
    useEffect(() => {
        let mounted = true;
        if(mounted){
            setsignoutcomp(<SignOut className="Snav-item"/>);
        }
        return () => mounted = false;
    }, []);
    return(
        <div className="SNav" id="Snav-container">
            <div id="Snav-top">
                <img src={logo} alt="timely logo" height="50px" width="50px"/>
            </div>
            <div id="Snav-bottom">
                <Whisper placement="right" trigger="hover" speaker={userTip}>
                    <IconButton style={{marginBottom: '1.2em'}} size='lg' className = "iconbuttons Snav-item" icon={<Icon icon="user" />} circle/>
                </Whisper>
                {signoutcomp}
            </div>
        </div>
    );
}