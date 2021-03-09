import React from 'react';
import {IconButton, Icon, ButtonToolbar} from 'rsuite';
import "../styles/Landing.css";

export default function Footer(){
    return ( 
        <div className="Footer">
                <p style={{ color:'white', textAlign: "center", marginBottom: "0.5em" }}>Made By Md Karim</p>
                <ButtonToolbar style={{ display: 'flex', justifyContent: 'center'}}>
                    <IconButton icon={<Icon icon="github" />} circle/>
                    <IconButton icon={<Icon icon="linkedin" />} color="blue" circle />
                </ButtonToolbar>
        </div>
     );
}
 
