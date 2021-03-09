import React from 'react';
import logo from '../images/logo.png';
import {Panel, ButtonToolbar} from 'rsuite';
import "../styles/Landing.css";

import SigninWithGoogle from './Signinhook';

export default function LSPanel(){
    // const history = useHistory();
    
    return ( 
        <div className="LSPanel">
            <div className="LSPanel-content">
                <img src={logo} alt='app-logo' height={'80%'} />
            </div>
            <div className="LSPanel-content">
                <Panel header={<h1>Timely</h1>}>
                    <p id="LSPanel-content-blurb" style={{ color: 'black', fontSize: '1.2em'}}>  
                        Timely helps you monitor and visualize your progress.
                        <br/>
                        Track your deadlines. Stay on top of your game.
                    </p>
                    <div id="LSPanel-buttons">
                        <ButtonToolbar>
                            <SigninWithGoogle/>
                        </ButtonToolbar>
                    </div>
                </Panel>
            </div>
        </div>
    );
}
 