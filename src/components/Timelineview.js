import React, { useState , useContext, useEffect} from 'react';
import {Button, Loader, Panel, Timeline} from 'rsuite';
import "../styles/Dashboard.css";
import Taskdetails from './Taskdetails';
import Timelinecontroller from './Timelinecontroller';
import Timelinegraph from './Timelinegraph';
import {AuthContext} from '../utils/AuthContext';

const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Timelineview(props){
    const {activeProject} = props;
    const [tasks, setTasks] = useState([]);
    const {user} = useContext(AuthContext);
    const [taskIndex, setTaskIndex] = useState(null);
    const [tasksList, setTasksList] = useState(<div></div>)

    const placeholderpanel = (
        !props.activeProject &&
        <Panel className = "placeholder">
            <Loader speed='slow' vertical content="Select a project and create some tasks..." size="lg"/>
        </Panel>
    );

    useEffect(() => {
        if(activeProject && user){
            async function getApiTasks(){
                let url = apiUrl + "/api/tasks/getByProject/"+activeProject._id;
                const res = await fetch(url);
                try{
                    const data = await res.json();
                     if(res.status === 200){
                         setTasks(data);
                     }
                 } catch (e){
                     console.log('error: ', e.message);
                 }
            }

            getApiTasks();
        }
    }, [activeProject, user]);

    useEffect(() => {
        let temp = tasks.map((item, i) => {
            return(
                <Timeline.Item key={i} value={item.id}>
                    <Button appearance='ghost' onClick={() => setTaskIndex(i)}>{item.title + " : " + new Date(item.dueDate).toLocaleString()}</Button>
                </Timeline.Item>
            );
        });
        setTasksList(temp);
    }, [tasks]);


    return(
        <div className="Timelineview" id="Timelineview-container">
            {placeholderpanel}

            {activeProject && 
                <Timelinegraph activeProject = {activeProject} tasksLength = {tasks.length} tasksList = {tasksList}/>
            }
            {activeProject &&
                <div className="Taskhub">
                    <Timelinecontroller activeProject = {activeProject} activeTask = {tasks[taskIndex]}/>
                    <Taskdetails activeTask = {tasks[taskIndex]}/>
                </div>
                
            }
        </div>
    );
}