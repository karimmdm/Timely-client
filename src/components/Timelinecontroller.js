import React , {useContext, useState}from 'react';
import { ButtonToolbar, IconButton, Panel, Whisper, Icon, Tooltip, Divider } from 'rsuite';
import { AuthContext } from '../utils/AuthContext';
import Addtask from './Addsomething';

const apiUrl = process.env.REACT_APP_BASE_URL;

export default function Timelinecontroller(props){
    const {activeTask} = props;
    const [showModal, setShowModal] = useState(false);
    const {setUser} = useContext(AuthContext);

    const addTaskInstance = (
        <Addtask
            showModal={showModal}
            setShowModal={setShowModal}
            title={"Add a New Task"}
            task={true}
            activeProject = {props.activeProject}
        />
    );

    async function deleteTask() {
        if(activeTask){
            const url = apiUrl + '/api/tasks/delete/' + activeTask._id;
            const res = await fetch(url, {
                method:'DELETE',
                headers: { 
                    'Content-type': 'application/json'
                } 
            });

            try{
                const data = await res.json();
                if(res.status === 200){
                    // console.log(data)
                    setUser(data);
                }else{
                    alert("Could not delete task");
                }
            } catch (e){
                console.log('error: ', e.message);
            }
        }
    }

    return(
        <div className="Timelinecontroller">
            <Panel bordered>
                <ButtonToolbar>
                    <Whisper placement="bottom" trigger="hover" speaker={<Tooltip> New Task </Tooltip>}>
                        <IconButton size = 'lg' icon={<Icon icon='plus' />} onClick={() => setShowModal(true)} circle />
                    </Whisper>
                    <Divider vertical/>
                    <Whisper placement="bottom" trigger="hover" speaker={<Tooltip> Edit Selected </Tooltip>}> 
                        <IconButton size="sm" icon={<Icon icon='edit2'/>} circle/>
                    </Whisper>
                    <Divider vertical/>
                    <Whisper placement="bottom" trigger="hover" speaker={<Tooltip> Delete Selected </Tooltip>}> 
                        <IconButton size = 'sm' icon={<Icon icon='trash'/>} onClick={deleteTask} circle/>
                    </Whisper>
                </ButtonToolbar>
            </Panel>
            {addTaskInstance}
        </div>
    );
}