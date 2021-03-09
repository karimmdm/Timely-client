import React, { useCallback, useEffect, useState } from 'react';
import { Dropdown, Icon} from 'rsuite';

import "../styles/Dashboard.css";
import Addproject from './Addsomething';

export default function ProjectSelector(props) {
    const [showModal, setShowModal] = useState(false);
    const [projectCreated, setProjectCreated] = useState(false);
    const {setActiveIndex, projects} = props;

    let projectsList = projects.length > 0 && projects.map((item, i) => {
       return (
            <Dropdown.Item onSelect={(eventKey) => {
                 setActiveIndex(eventKey);
                localStorage.setItem('recentProject', eventKey);
            }} className="dropDownItem" eventKey = {i} key={i} value={item.id}>{item.title}</Dropdown.Item>
       ) 
    }, this);

    const addProject = () =>{
        setShowModal(true);
    }
    
    const changeToLatest = useCallback(() => {
        setActiveIndex(projects.length-1);
        localStorage.setItem('recentProject', projects.length-1);
    }, [projects.length, setActiveIndex]);

    useEffect(() => {
        if(projectCreated === true){
            changeToLatest();
            setProjectCreated(false);
        }

    }, [projectCreated, changeToLatest]);

    const dropdownInstance = (
        <Dropdown 
            id="Project-dropdown"
            trigger={['hover']} 
            title="Select Project" 
            icon={<Icon icon="file" />} 
            appearance="primary" size="md"
            placement="bottomEnd">
            <Dropdown.Item onSelect = {addProject} icon={<Icon icon="pencil"/> }>New Project</Dropdown.Item>
            {projectsList}
        </Dropdown>
    );
    return(
        <div className = "ProjectSelector">
            {dropdownInstance}
            <Addproject 
            showModal = {showModal} 
            setShowModal = {setShowModal}
            title = {"Add a New Project"}  
            task = {false} 
            setProjectCreated = {setProjectCreated}
            />
        </div>
    );
}
