import React from 'react';
import {useHistory} from 'react-router-dom';
import {Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'rsuite';
import "../styles/Landing.css"

export default function Login(){
    const history = useHistory();

    return ( 
        <div className="Login" id="login-container">  
            <div id="login-content">
                <Panel header={ <h4>Login to Timely</h4> } id="login-panel" bordered shaded>
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
                            <ButtonToolbar>
                                <Button appearance="primary" style= {{ marginRight: 5 }}>Login</Button>
                                <Button onClick={ () => {history.push('/')}} appearance="default">Cancel</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Panel>
            </div>
        </div>
     );
}
 
