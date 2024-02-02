import axios from "axios";
import { Button, SelectField, TextInputField } from "evergreen-ui";
import { useState } from "react";
import { toaster } from "evergreen-ui";

function CreateProjectComponent(props) {
    const [inputValue, setInputValue] = useState('')


    const createProject = async () => {
        var body = new FormData();
        body.append('projectName', inputValue)
        var resp = await axios.post("http://localhost:5000/project/add", body);
        if (resp.status === 200){
            toaster.success('Project created!')  
            
            window.location.reload(true)
        }
        else{
            toaster.danger('Something went wrong!')  
        }
        
        props.setMode(0)
    }

    return (
        <div style={{backgroundColor: "gray;"}}>
            <div className='d-flex flex-row justify-content-center mb-5'>
                <h1>
                    New Project Screen
                </h1>
                <div className="align-self-center save-btns">
                    
                </div>
            </div>
            <TextInputField
                        className="w-50"
                        label="Project Name"
                        placeholder="Enter Project Name..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
            /><Button className="me-2" appearance="primary" intent="success" onClick={createProject}>
            Create
        </Button>
        </div>

    );
}

export default CreateProjectComponent;