import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SidebarComponent from '../common/sidebar-component';
import CreateJobComponent from './jobs/create-job-component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import CreateFolderComponent from './folders/create-folder.component';
import CreateProjectComponent from './projects/create-project.component';
import NavbarComponent from '../common/navbar-component';
import EditJobComponent from './jobs/edit-job-component';

function HomeComponent() {
    const [mode, setMode] = useState(0)
    const [selectedProjectId, setSelectedProjectId] = useState('')
    const [selectedJobId, setSelectedJobId] = useState('')
    const [selectedParentFolderId, setSelectedParentFolderId] = useState('')

    return (
        <div>
            <NavbarComponent/>
            <div className='row'>
                <div className='col-md-2 sidebar'>
                    <SidebarComponent setMode={setMode} setSelectedProjectId={setSelectedProjectId} setSelectedParentFolderId={setSelectedParentFolderId} setSelectedJobId={setSelectedJobId}/>
                </div>

                <div className='col-md-10'>
                    {mode === 0 ? <>Please select an option</>: <></>}
                    {mode === 1 ? <CreateFolderComponent setMode={setMode} selectedProjectId={selectedProjectId} selectedParentFolderId={selectedParentFolderId}/> : <></>}
                    {mode === 2 ? <CreateProjectComponent setMode={setMode}/> : <></>}
                    {mode === 3 ? <CreateJobComponent setMode={setMode} selectedProjectId={selectedProjectId} />  : <></>}
                    {mode === 4 ? <EditJobComponent setMode={setMode} selectedJobId={selectedJobId} />  : <></>}
                    

                </div>

            </div>
        </div>
     );
}

export default HomeComponent;