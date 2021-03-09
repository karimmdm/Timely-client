import React from 'react';
import {Panel, Loader, Divider} from 'rsuite';
import "../styles/Dashboard.css";

export default function Timelinedetails(props){
    const {activeTask} = props;
    const placeholderpanel = (
        <Panel className = "placeholder" bordered>
            <Loader speed='slow' vertical content="Select a task to view details..." size="lg"/>
        </Panel>
    );
    const panelheader = (
        activeTask &&
        <div>
            <h5>{activeTask.title}</h5>
            <p>Due on: {new Date(activeTask.dueDate).toLocaleString()}</p>
            <Divider/>
        </div>
        
    );

    return(
        <div className="Taskdetails">
            {!activeTask && placeholderpanel}
            {activeTask && 
                <Panel header={panelheader} bordered> 
                </Panel>
            }
        </div>
    );
}