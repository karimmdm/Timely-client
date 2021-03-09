import React, { useState, useContext } from 'react';
import { Modal, Button, ButtonToolbar, Form, FormGroup, FormControl, ControlLabel, DatePicker, Schema} from 'rsuite';
import "../styles/Dashboard.css";
import {AuthContext} from '../utils/AuthContext';

const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Addsomething(props){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDuedate] = useState(null); 
    const {user, setUser} = useContext(AuthContext);
    
    // if props.task === true then a date form shoudld be included
    // otherwise this is an add project
    function DueDate(props) {
        return (<DatePicker 
                format="MMM DD YYYY hh:mm A" 
                placeholder="Select Due Date"
                value = {dueDate}
                ranges={[
                    {
                      label: 'Today',
                      value: new Date()
                    }
                  ]}
                showMeridian
                onChange={(v) => {setDuedate(v)}}/>
            ); 
    };

    async function post(){
        if (title.trim() === "" || description.trim() === "" || (props.task && dueDate === null)) {
            // console.log("no data inputed"); 
            return;
        }

        if(props.task){
            const userId = user._id;
            const projectId = props.activeProject._id;
            const url = apiUrl + "/api/tasks/add";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    projectId: projectId,
                    title: title,
                    description: description,
                    dueDate: dueDate
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            try{
                const userUpdate = await res.json();
                if(res.ok){
                    setUser(userUpdate);
                }else{
                    alert("Could not create task");
                }
            } catch (e){
                console.log('error: ', e.message);
            }
            
        }
        else{
            // console.log("posting project...");
            const res = await fetch(apiUrl+"/api/project/add", {
                method: "POST",
                body: JSON.stringify({
                    userId: user._id,
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            try{
                const userUpdate = await res.json();
                if(res.ok){
                    setUser(userUpdate);
                    props.setProjectCreated(true);
                }else{
                    alert("Could not create project");
                }
            } catch (e){
                console.log('error: ', e.message);
            }
            
        }

        // console.log(title);
        // console.log(description);
        // console.log(dueDate);
        props.setShowModal(false);
        setTitle('');
        setDescription('');
        setDuedate(null);
    }

    function setFormValue(formValue){
        setTitle(formValue.title ? formValue.title : '');
        setDescription(formValue.description ? formValue.description: '');
        if(props.task){
            setDuedate(formValue.dueDate ? formValue.dueDate : null);
        }
    }

    const {StringType, DateType} = Schema.Types;
    const model = Schema.Model({
        title: StringType().maxLength(30, 'The field cannot be greater than 30 characters').isRequired('This field is required.'),
        description: StringType().maxLength(70, 'The field cannot be greater than 70 characters'),
        dueDate: DateType().isRequired('This is required.')
    });

    return(
        <Modal size='xs' show={props.showModal} onHide={() => props.setShowModal(false)}> 
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form model = {model} onChange={formValue => setFormValue(formValue)}>
                    <FormGroup>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl name="title"/>
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Description</ControlLabel>
                        <FormControl name="description" componentClass="textarea"/>
                    </FormGroup> 
                    {props.task && 
                    <FormGroup>
                        <ControlLabel>Due Date</ControlLabel>
                        <FormControl 
                        name="dueDate" 
                        accepter = {DueDate}
                        />
                    </FormGroup>}
                    <ButtonToolbar style={{marginTop: "3.0em"}}>
                        <Button type='submit' onClick={post} appearance="primary">
                            Add
                        </Button>
                        <Button onClick={() => props.setShowModal(false)} appearance="default">
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Modal.Body>
        </Modal>
    );
}