import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'evergreen-ui';
import { useState } from 'react';

function NavbarComponent() {
    const [name, setName] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        let email = localStorage.getItem("user")
        if (email !== null){
            setName(email)
        }
        else{
            setName("fastData")
        }
    }, [])

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">FAST-DATA</Navbar.Brand>
                    <Nav className="me-auto">
                        <span>Work in Progress</span>
                    </Nav>
                    
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a href=""  onClick={() => {navigate("/home")}}>Home</a>
                        </Navbar.Text>
                        <Navbar.Text className='ms-5'>
                            <a href="" onClick={() => {navigate("/job-data")}}>Job Display</a>
                        </Navbar.Text>
                        <Navbar.Text className='ms-5'>
                            <Avatar name={name} size={40} />  
                        </Navbar.Text>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
     );
}

export default NavbarComponent;