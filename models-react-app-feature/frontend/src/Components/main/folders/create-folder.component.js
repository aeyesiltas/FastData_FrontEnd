import axios from "axios";
import { Button, SelectField, TextInputField } from "evergreen-ui";
import { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import { Select } from "evergreen-ui";
import { Checkbox } from "evergreen-ui";
import React from "react";

function CreateFolderComponent(props) {
    const [inputValue, setInputValue] = useState('')
    const [checked, setChecked] = React.useState(true)

    const createFolder = async () => {
        var body = new FormData();

        
        if (!props.selectedProjectId.isSubFolder){
            body.append('parentFolderId', '')
            body.append('projectId', props.selectedProjectId.id)
        }
        else{
            body.append('parentFolderId', props.selectedProjectId.id)
            body.append('projectId', props.selectedProjectId)
        }
        body.append('isSubFolder', props.selectedProjectId.isSubFolder)
        body.append('folderName', inputValue)

        var resp = await axios.post("http://localhost:5000/folder/add", body);
        if (resp.status === 200) {
            toaster.success('Folder created!')

            window.location.reload(true)
        }
        else {
            toaster.danger("Something went wrong!")
        }

        props.setMode(0)
    }

    return (
        <div style={{ backgroundColor: "gray;" }}>
            <div className='d-flex flex-row justify-content-center mb-5'>
                <h1>
                    New Folder Screen
                </h1>
                <div className="align-self-center save-btns">

                </div>
            </div>

            <TextInputField
                className="w-50"
                label="Folder Name"
                placeholder="Enter Folder Name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            <Button className="me-2 mt-5" appearance="primary" intent="success" onClick={createFolder}>

                Create
            </Button>
        </div>

    );
}

export default CreateFolderComponent;