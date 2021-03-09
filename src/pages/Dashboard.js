import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import SigninWithGoogle from '../components/Signinhook';

import '../styles/Dashboard.css';
import SNav from '../components/SNav';
import ProjectSelector from '../components/ProjectSelector';
import Projectview from '../components/Projectview';
import Timelineview from '../components/Timelineview';

export default function Dashboard(){
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [activeIndex, setActiveIndex] = useState(localStorage.recentProject? localStorage.recentProject: -1);
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        const signedIn = localStorage.getItem('signedIn');
        if(signedIn === 'false'){
            history.push('/');
        }
    }, [history]);

    useEffect(() => {
        if(user){
            setProjects(user.projects);
        }
    }, [user]);

    useEffect(() => {
        if(projects != null && activeIndex > -1){
            setActiveProject(projects[activeIndex]);
        }
    }, [projects, activeIndex, activeProject]);

    return (  
        <div className = "Dashboard" id="Dashboard-container">
            <SNav/>
            <div className="Dashboard-content">

                <div className="Dashboard-header">
                    <ProjectSelector projects = {projects} setActiveIndex={setActiveIndex}/>
                </div>
                <div className="Dashboard-body">
                    <Projectview 
                        activeProject={activeProject} 
                        setActiveProject={setActiveProject} 
                        setActiveIndex={setActiveIndex}/>
                    <Timelineview activeProject = {activeProject}/>
                </div>
            </div>
            <SigninWithGoogle/>
        </div>
    );
}
 
