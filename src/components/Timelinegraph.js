import React from 'react';
import { Panel, Timeline, Loader} from 'rsuite';
import "../styles/Dashboard.css";

export default function Timelinegraph(props) { 
    const {tasksList, tasksLength} = props

    const placeholderpanel = (
        <Panel className = "placeholder" bordered>
            <Loader speed='slow' vertical content="You have no tasks yet..." size="lg"/>
        </Panel>
    );

    return (
        <div className="Timelinegraph">
           {tasksLength > 0 &&
           <Panel bordered>
                <Timeline endless>
                    {tasksList}
                </Timeline>
            </Panel> 
            }   

            {tasksLength === 0 && placeholderpanel}
            
        </div>
    );
}