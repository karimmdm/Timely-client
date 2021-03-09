import React from 'react';
import {Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'rsuite';
import "../styles/Landing.css"
import { useHistory } from 'react-router-dom';

export default function Signup(){
    const history = useHistory();

    return ( 
        <div className="Signup" id="signup-container">  
            <div id="signup-content">
                <Panel header={ <h4>Signup for a Timely!</h4> } id="signup-panel" bordered shaded>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl name="email" type="email" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl name="password" type="password" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl name="confirm-password" type="password" />
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button appearance="primary" style= {{ marginRight: 5 }}>Signup</Button>
                                <Button onClick={ () => {history.push('/')}} appearance="default">Cancel</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Panel>
            </div>
        </div>
     );
}
 
