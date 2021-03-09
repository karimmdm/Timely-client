import React , {useEffect, useState, useContext} from 'react';
import {Panel, Placeholder, Progress, IconButton, Icon} from 'rsuite';
import "../styles/Dashboard.css";
import { AuthContext } from '../utils/AuthContext';

const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Projectview(props){
    const {activeProject} = props
    const { Paragraph } = Placeholder;
    const { Line } = Progress;

    const [apiProject, setApiProject] = useState(null);
    const {user, setUser} = useContext(AuthContext);

    

    async function deleteProject(){
        //make api request
        const url = apiUrl+"/api/project/delete/"+apiProject._id;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { 
                'Content-type': 'application/json'
            } 
        });

        try{
            const data = await res.json();
            if(res.status === 200){
                props.setActiveIndex(-1);
                props.setActiveProject(null);
                // console.log(data);
                setUser(data);
            }else{
                alert("Could not delete project");
            }
        } catch (e){
            console.log('error: ', e.message);
        }
    }

    useEffect(() => {
        if(activeProject && user){
            async function getProjectDetails(){
                // console.log("fetching project...");
                const url = apiUrl+"/api/project/get/?projectId="+activeProject._id;
                const res = await fetch(url);
                try{
                    const data = await res.json();
                    if(res.status === 200){
                        // console.log(data);
                        setApiProject(data);
                    
                    }
                } catch (e){
                    console.log('error: ', e.message);
                }
            }

            getProjectDetails();
        }else{
            setApiProject(null);
        } 
    }, [user, activeProject]);
    
    const panelHeader = (
        <div className="Panel-header">
            <h4>{apiProject && apiProject.title}</h4>
            <IconButton size = 'lg' onClick={deleteProject} icon={<Icon icon="trash"/>} circle/> 
        </div>    
    )

    const placeholderpanel = (
        !apiProject &&
        <Panel header={<h4>Select a Project</h4>} bordered>
            <Paragraph rows={2} active style={{width: "15em"}}/>
        </Panel>
    );

    return(
        <div className="Projectview" id="Projectview-container">
            {apiProject &&
            <Panel header={panelHeader} bordered>
                <p> {apiProject.description}</p>
                <Line percent={35} strokeWidth={4} style={{paddingLeft: "0"}} status='active'/>
            </Panel>
            }
            {placeholderpanel}
        </div>
    );
}